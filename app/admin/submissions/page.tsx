'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Filter,
  Search,
  Eye,
  Edit,
  Receipt,
  AlertCircle,
  Building2,
  Globe,
  Phone,
  Tag,
  FileDown
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

type Submission = {
  id: string
  userId: string
  fullName: string
  email: string
  phone: string
  affiliation: string
  country: string
  category: string
  daysAttending: string
  presentingPaper: boolean
  paperTitle?: string
  paperAbstract?: string
  fileUrl?: string
  uploadedFileName?: string
  paperStatus?: string
  paperUploadedAt?: any
  paymentProofUrl?: string
  paymentProofFileName?: string
  paymentProofUploadedAt?: any
  registeredAt?: any
}

type FilterType = 'all' | 'withPapers' | 'withoutPapers'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [newStatus, setNewStatus] = useState<string>('')
  const [updating, setUpdating] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportType, setExportType] = useState<'withPapers' | 'withoutPapers'>('withPapers')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !auth) return

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await fetchSubmissions()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [submissions, filter, searchQuery])

  const fetchSubmissions = async () => {
    try {
      const registrationsSnapshot = await getDocs(collection(db, 'registrations'))
      const allSubmissions = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Submission[]

      setSubmissions(allSubmissions)
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const applyFilters = () => {
    let filtered = [...submissions]

    // Apply paper filter
    if (filter === 'withPapers') {
      filtered = filtered.filter(s => s.presentingPaper && s.paperTitle)
    } else if (filter === 'withoutPapers') {
      filtered = filtered.filter(s => !s.presentingPaper || !s.paperTitle)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(s =>
        s.fullName?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.paperTitle?.toLowerCase().includes(query) ||
        s.affiliation?.toLowerCase().includes(query)
      )
    }

    setFilteredSubmissions(filtered)
  }

  const handleStatusUpdate = async () => {
    if (!selectedSubmission || !newStatus) return

    setUpdating(true)
    try {
      const submissionRef = doc(db, 'registrations', selectedSubmission.id)
      await updateDoc(submissionRef, {
        paperStatus: newStatus,
        statusUpdatedAt: serverTimestamp(),
      })

      // Refresh submissions
      await fetchSubmissions()
      setShowStatusDialog(false)
      setSelectedSubmission(null)
      setNewStatus('')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'accepted':
        return (
          <Badge className="bg-green-500 hover:bg-green-500/90">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case 'pending':
      default:
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700 dark:text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    if (timestamp.toDate) {
      return new Date(timestamp.toDate()).toLocaleString()
    }
    return new Date(timestamp).toLocaleString()
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      // Filter submissions based on export type
      let dataToExport = [...submissions]
      
      if (exportType === 'withPapers') {
        dataToExport = dataToExport.filter(s => s.presentingPaper && s.paperTitle && s.paperTitle.trim() !== '')
      } else {
        dataToExport = dataToExport.filter(s => !s.presentingPaper || !s.paperTitle || s.paperTitle.trim() === '')
      }

      if (dataToExport.length === 0) {
        alert(`No submissions found for ${exportType === 'withPapers' ? 'with papers' : 'without papers'}.`)
        setExporting(false)
        return
      }

      // Export to Excel
      const worksheetData: any[] = []
      
      if (exportType === 'withPapers') {
        // Header row for "with papers"
        worksheetData.push([
          'S.No',
          'Full Name',
          'Email',
          'Phone',
          'Affiliation',
          'Country',
          'Category',
          'Days Attending',
          'Paper Title',
          'Paper URL',
          'Status'
        ])
        
        // Data rows
        dataToExport.forEach((submission, index) => {
          worksheetData.push([
            index + 1,
            submission.fullName || 'N/A',
            submission.email || 'N/A',
            submission.phone || 'N/A',
            submission.affiliation || 'N/A',
            submission.country || 'N/A',
            submission.category || 'N/A',
            submission.daysAttending || 'N/A',
            submission.paperTitle || 'N/A',
            submission.fileUrl || 'N/A',
            submission.paperStatus || 'pending'
          ])
        })
      } else {
        // Header row for "without papers"
        worksheetData.push([
          'S.No',
          'Full Name',
          'Email',
          'Phone',
          'Affiliation',
          'Country',
          'Category',
          'Days Attending'
        ])
        
        // Data rows
        dataToExport.forEach((submission, index) => {
          worksheetData.push([
            index + 1,
            submission.fullName || 'N/A',
            submission.email || 'N/A',
            submission.phone || 'N/A',
            submission.affiliation || 'N/A',
            submission.country || 'N/A',
            submission.category || 'N/A',
            submission.daysAttending || 'N/A'
          ])
        })
      }

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
      
      // Set column widths
      const maxWidths = worksheetData[0].map((_: any, colIndex: number) => {
        return Math.max(
          ...worksheetData.map((row: any[]) => {
            const cellValue = row[colIndex]
            return cellValue ? String(cellValue).length : 10
          })
        )
      })
      
      worksheet['!cols'] = maxWidths.map((width: number) => ({ wch: Math.min(width + 2, 50) }))
      
      // Add worksheet to workbook
      const sheetName = exportType === 'withPapers' ? 'With Papers' : 'Without Papers'
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
      
      // Generate and download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const fileName = `submissions_${exportType}_${new Date().toISOString().split('T')[0]}.xlsx`
      saveAs(blob, fileName)

      setShowExportDialog(false)
    } catch (error) {
      console.error('Error exporting data:', error)
      alert(`Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Submissions</h1>
        <p className="text-muted-foreground">View and manage all paper submissions</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, paper title, or affiliation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="withPapers">With Papers</SelectItem>
                  <SelectItem value="withoutPapers">Without Papers</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowExportDialog(true)}
                className="gap-2"
              >
                <FileDown className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSubmissions.length} of {submissions.length} submissions
      </div>

      {/* Submissions List */}
      <div className="grid gap-4">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No submissions found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{submission.fullName}</CardTitle>
                      {submission.presentingPaper && submission.paperTitle && getStatusBadge(submission.paperStatus)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {submission.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {submission.affiliation}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {submission.daysAttending}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSubmission(submission)
                        setShowDetailsDialog(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {submission.presentingPaper && submission.paperTitle && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSubmission(submission)
                          setNewStatus(submission.paperStatus || 'pending')
                          setShowStatusDialog(true)
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Update Status
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              {submission.presentingPaper && submission.paperTitle && (
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Paper Title:</p>
                      <p className="text-sm text-muted-foreground">{submission.paperTitle}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {submission.fileUrl && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Paper Uploaded</span>
                        </div>
                      )}
                      {submission.paymentProofUrl ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Payment Proof Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-600 font-medium">Payment Proof Not Uploaded</span>
                        </div>
                      )}
                    </div>
                    {submission.fileUrl && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(submission.fileUrl, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Paper
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Submission Details</DialogTitle>
            <DialogDescription>
              Complete information about this submission
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <p className="text-sm pl-6">{selectedSubmission.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <p className="text-sm pl-6">{selectedSubmission.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <p className="text-sm pl-6">{selectedSubmission.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Affiliation
                    </Label>
                    <p className="text-sm pl-6">{selectedSubmission.affiliation}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      Country
                    </Label>
                    <p className="text-sm pl-6">{selectedSubmission.country}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Registered At
                    </Label>
                    <p className="text-sm pl-6">{formatDate(selectedSubmission.registeredAt)}</p>
                  </div>
                </div>
              </div>

              {/* Conference Details Section */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Conference Details</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Registration Category</Label>
                    <p className="text-sm">{selectedSubmission.category}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Days Attending</Label>
                    <p className="text-sm">{selectedSubmission.daysAttending}</p>
                  </div>
                </div>
              </div>

              {/* Paper Submission Section */}
              {selectedSubmission.presentingPaper && selectedSubmission.paperTitle ? (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Paper Submission</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Paper Title</Label>
                      <p className="text-sm mt-1 font-medium">{selectedSubmission.paperTitle}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Abstract</Label>
                      <div className="mt-2 p-3 bg-muted/50 rounded-lg border">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {selectedSubmission.paperAbstract}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">Paper Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedSubmission.paperStatus)}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Submitted At</Label>
                        <p className="text-sm mt-1">{formatDate(selectedSubmission.paperUploadedAt)}</p>
                      </div>
                    </div>

                    {/* Paper File Section */}
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedSubmission.fileUrl ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <div>
                                <Label className="text-sm font-medium text-green-600">Paper File Uploaded</Label>
                                <p className="text-xs text-muted-foreground">{selectedSubmission.uploadedFileName}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <Label className="text-sm font-medium text-red-600">Paper File Not Found</Label>
                            </>
                          )}
                        </div>
                        {selectedSubmission.fileUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(selectedSubmission.fileUrl, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Paper
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Payment Proof Section */}
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedSubmission.paymentProofUrl ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <div>
                                <Label className="text-sm font-medium text-green-600 flex items-center gap-2">
                                  <Receipt className="w-4 h-4" />
                                  Payment Proof Uploaded
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {selectedSubmission.paymentProofFileName}
                                </p>
                                {selectedSubmission.paymentProofUploadedAt && (
                                  <p className="text-xs text-muted-foreground">
                                    Uploaded: {formatDate(selectedSubmission.paymentProofUploadedAt)}
                                  </p>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                              <div>
                                <Label className="text-sm font-medium text-orange-600 flex items-center gap-2">
                                  <Receipt className="w-4 h-4" />
                                  Payment Proof Not Uploaded
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  User has not uploaded payment proof yet
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        {selectedSubmission.paymentProofUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(selectedSubmission.paymentProofUrl, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            View Payment Proof
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm font-medium">No Paper Submission</Label>
                        <p className="text-xs text-muted-foreground">This user has not submitted a paper</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedSubmission?.presentingPaper && selectedSubmission?.paperTitle && (
              <Button
                onClick={() => {
                  setShowDetailsDialog(false)
                  setSelectedSubmission(selectedSubmission)
                  setNewStatus(selectedSubmission.paperStatus || 'pending')
                  setShowStatusDialog(true)
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Paper Status</DialogTitle>
            <DialogDescription>
              Change the review status for this paper submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Paper Title</Label>
              <p className="text-sm text-muted-foreground">{selectedSubmission?.paperTitle}</p>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={newStatus} onValueChange={(value) => value && setNewStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue /> 
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="accepted">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Accepted
                    </div>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} disabled={updating || !newStatus}>
              {updating ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Submissions</DialogTitle>
            <DialogDescription>
              Select the type of data you want to export to Excel
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Export Type</Label>
              <div className="flex flex-col gap-3">
                <div
                  className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                    exportType === 'withPapers'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => setExportType('withPapers')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    exportType === 'withPapers'
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {exportType === 'withPapers' && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label className="font-semibold cursor-pointer">With Papers</Label>
                    <p className="text-sm text-muted-foreground">
                      Export submissions that include paper submissions
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                    exportType === 'withoutPapers'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => setExportType('withoutPapers')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    exportType === 'withoutPapers'
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {exportType === 'withoutPapers' && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label className="font-semibold cursor-pointer">Without Papers</Label>
                    <p className="text-sm text-muted-foreground">
                      Export submissions that do not include paper submissions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)} disabled={exporting}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={exporting}>
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Export to Excel
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


