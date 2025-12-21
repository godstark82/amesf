import SectionHeader from "../common/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ASSOCIATION_IMAGE = "https://studyin-uzbekistan.uz/media/cache/12/5f/125f4b0b90afccc88819e127154fdc0a.jpg";


export default function Association() {
    return (
        <section className="bg-linear-to-r from-primary/5 via-white to-secondary/5 py-14">
            <div className="container mx-auto px-4">
                <SectionHeader title="In Association With" />
                <Card className="max-w-6xl mx-auto overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-full">
                            <img
                                src={ASSOCIATION_IMAGE}
                                alt="Samarkand State University campus"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white space-y-1">
                                <p className="text-xs uppercase tracking-[0.2em]">Samarkand State University</p>
                                <p className="text-lg font-semibold">Uzbekistan</p>
                            </div>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <Badge variant="secondary" className="w-fit">Partner Institution</Badge>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-primary">
                                    Faculty of Artificial Intelligence and Digital Technologies
                                </h3>
                                <p className="text-lg font-semibold text-muted-foreground">
                                    Samarkand State University, Uzbekistan
                                </p>
                            </div>
                            <p className="text-base leading-relaxed text-justify text-muted-foreground">
                                Samarkand State University, Uzbekistan, officially founded in 1927 but rooted in the
                                600-year legacy of the Mirzo Ulughbek Madrasa, is one of Uzbekistan&apos;s oldest and
                                most renowned institutions. It has evolved through several historical stages and now
                                comprises 7 faculties, 4 institutes, and 59 departments offering 72 programs. The
                                university serves nearly 17,000 undergraduate and 700 graduate students, supported by
                                around 900 faculty members and extensive research opportunities.
                            </p>
                            
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
}

