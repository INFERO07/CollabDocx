import React from 'react';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent 
} from "@/components/ui/card";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MoreVertical, Undo2, Trash2, History, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentVersion {
    id: string;
    name?: string;
    createdAt: string;
    content: string;
}

interface DocumentVersionsProps {
    versions: DocumentVersion[];
    myRole: string;
    setRollbackVersionId: (id: string) => void;
    setRollbackConfirmDialogOpen: (open: boolean) => void;
    onDeleteVersion?: (id: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const DocumentVersions: React.FC<DocumentVersionsProps> = ({ 
    versions, 
    myRole, 
    setRollbackVersionId, 
    setRollbackConfirmDialogOpen,
    onDeleteVersion
}) => {
    const handleRollback = (versionId: string) => {
        setRollbackVersionId(versionId);
        setRollbackConfirmDialogOpen(true);
    };

    const handleDelete = (versionId: string) => {
        onDeleteVersion && onDeleteVersion(versionId);
    };

    function parseHTMLToText(htmlString: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        return doc.body.textContent || "";
    }

    return (
        <Card className="w-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-transparent"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-100/20 to-transparent rounded-full blur-2xl"></div>
            </div>

            <CardHeader className="p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm border-b border-emerald-100">
                <div className="flex items-center gap-2">
                    <History className="w-6 h-6 text-emerald-600" />
                    <div>
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent">
                            Document History
                        </CardTitle>
                        <CardDescription className="text-emerald-600">
                            Version control and snapshots
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-[400px] w-full">
                    {myRole === 'VIEWER' ? (
                        <div className="p-6 text-center">
                            <Badge variant="outline" className="border-emerald-200 text-emerald-600 px-4 py-2">
                                Viewer mode - Limited access
                            </Badge>
                        </div>
                    ) : versions.length === 0 ? (
                        <div className="h-full flex flex-col justify-center items-center p-6 text-emerald-600">
                            <FileText className="w-12 h-12 mb-2 text-emerald-400" />
                            <p className="text-center">No versions saved yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-emerald-100">
                            {versions.map((version, index) => (
                                <div 
                                    key={version.id} 
                                    className="p-4 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-emerald-500" />
                                                <span className="text-sm text-emerald-600">
                                                    {formatDate(version.createdAt)}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-emerald-800 mb-1">
                                                {version.name || `Version ${versions.length - index}`}
                                            </h3>
                                            <div className="bg-emerald-50/50 rounded-lg p-3 mt-2">
                                                <pre className="text-sm text-emerald-700 line-clamp-2 font-mono">
                                                    {version.content.length === 0 
                                                        ? "No content" 
                                                        : parseHTMLToText(version.content).slice(0, 100) + '...'}
                                                </pre>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 hover:bg-emerald-100/50"
                                                >
                                                    <MoreVertical className="h-4 w-4 text-emerald-600" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-sm border-emerald-100">
                                                <DropdownMenuItem 
                                                    className="cursor-pointer hover:bg-emerald-50"
                                                    onSelect={() => handleRollback(version.id)}
                                                >
                                                    <Undo2 className="mr-2 h-4 w-4 text-emerald-600" />
                                                    <span className="text-emerald-700">Rollback</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="cursor-pointer text-red-600 hover:bg-red-50"
                                                    onSelect={() => handleDelete(version.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete version
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default DocumentVersions;