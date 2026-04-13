import { useRef, useState } from "react";
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileEdit, Lock, MessageCircle, Send, Mail, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ImageResize from "quill-image-resize-module-react";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

interface DocumentEditorProps {
    text: string;
    sendData: (value: string, delta: unknown, source: string, editor: unknown) => void;
    saveDocument: () => void;
    currentWriter?: string | null;
    unsaved: boolean;
    saveLoading: boolean;
    isReadOnly: boolean;
    role?: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
    text, 
    sendData, 
    saveDocument, 
    currentWriter, 
    unsaved, 
    saveLoading, 
    isReadOnly,
    role
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };
    
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareMenu]);
   const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }], // 👈 ADD THIS
      ["image"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
    handlers: {
      image: handleImageUpload,
    },
  },
  imageResize: {
    parchment: ReactQuill.Quill.import("parchment"),
  },
};
    const handleImageUpload = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      quill.insertEmbed(range.index, "image", base64);
    };

    reader.readAsDataURL(file);
  };
};
const quillRef = useRef(null);

  const handleShareWhatsApp = () => {
    const documentURL = window.location.href;
    const documentTitle = document.title || "Check out this document";
    const message = `📄 ${documentTitle}\n\nOpen document: ${documentURL}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleShareTelegram = () => {
    const documentURL = window.location.href;
    const documentTitle = document.title || "Check out this document";
    const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(documentURL)}&text=${encodeURIComponent(documentTitle)}`;
    window.open(telegramURL, '_blank');
  };

  const handleShareGmail = () => {
    const documentURL = window.location.href;
    const documentTitle = document.title || "Check out this document";
    const subject = `Shared Document: ${documentTitle}`;
    const body = `Hi,\n\nI wanted to share this document with you:\n\n${documentTitle}\n\nOpen it here: ${documentURL}\n\nBest regards`;
    const gmailURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailURL, '_blank');
  };

    return (

 <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-xl relative">
  {/* BACKGROUND */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-transparent"></div>
  </div>

  {/* HEADER */}
  <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-100 pb-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 overflow-visible">
    <div>
      <CardTitle className="text-2xl font-bold flex items-center gap-2">
        <FileEdit className="w-6 h-6 text-emerald-600" />
        Document Editor
      </CardTitle>
      <CardDescription>Real-time collaborative editing</CardDescription>
    </div>

    <div className="flex items-center gap-3 w-full md:w-auto justify-end mt-3 md:mt-0 overflow-visible">
      {role === "VIEWER" && (
        <Badge className="bg-emerald-50 border border-emerald-200">
          <Lock className="w-4 h-4 mr-1" />
          Read Only
        </Badge>
      )}
      
      {/* Share Link Button with Menu */}
      <div className="relative share-menu-container overflow-visible">
        <Button
          onClick={() => setShowShareMenu(!showShareMenu)}
          title="Share Document"
          className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap"
          size="sm"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </Button>
        
        {showShareMenu && (
          <div className="fixed bg-white border-2 border-emerald-300 rounded-lg shadow-2xl p-4 z-[9999] w-56" style={{
            top: '120px',
            right: '20px'
          }}>
            <p className="text-sm font-bold text-gray-800 mb-3">Share via:</p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  handleShareWhatsApp();
                  setShowShareMenu(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white w-full justify-start gap-2 font-semibold"
                size="sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              
              <Button
                onClick={() => {
                  handleShareTelegram();
                  setShowShareMenu(false);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full justify-start gap-2 font-semibold"
                size="sm"
              >
                <Send className="w-4 h-4" />
                Telegram
              </Button>
              
              <Button
                onClick={() => {
                  handleShareGmail();
                  setShowShareMenu(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white w-full justify-start gap-2 font-semibold"
                size="sm"
              >
                <Mail className="w-4 h-4" />
                Gmail
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </CardHeader>

  {/* ✅ SCROLL AREA */}
  <CardContent 
    className="p-0 overflow-y-auto max-h-[600px]"
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #f0fdf4'
    }}
  >

    <div className="editor-wrapper h-96 overflow-y-auto" style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #f0fdf4'
    }}
    onScroll={(e) => {
      const element = e.currentTarget;
      element.style.setProperty('--scrollbar-thumb', '#10b981');
      element.style.setProperty('--scrollbar-track', '#f0fdf4');
    }}>
      <style>{`
        .editor-wrapper::-webkit-scrollbar {
          width: 10px;
        }
        .editor-wrapper::-webkit-scrollbar-track {
          background: #f0fdf4;
        }
        .editor-wrapper::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 5px;
        }
        .editor-wrapper::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
      <div className="max-w-3xl mx-auto p-5 h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={text}
            onChange={(value, delta, source, editor) =>
              sendData(value, delta, source, editor)
            }
            modules={modules}
            readOnly={role === "VIEWER"}
            style={{ height: "100%" }}
          />
        </div>

      </div>

    </div>


                {currentWriter && (
                    <div className="mt-4 p-3 bg-emerald-50/80 backdrop-blur-sm rounded-lg border border-emerald-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-emerald-700">
                                    Currently editing: <span className="font-semibold">{currentWriter}</span>
                                </span>
                            </div>
                            {unsaved && (
                                <Badge variant="outline" className="border-amber-300 text-amber-600">
                                    Unsaved changes
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="mt-4 p-6 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-t border-emerald-100">
                {role !== 'VIEWER' && (
                    <Button 
                        disabled={saveLoading} 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 min-w-[130px]" 
                        onClick={saveDocument}
                    >
                        {saveLoading ? (
                            <p className="flex items-center gap-2">
                                <Loader2 className="animate-spin" /> Saving...
                            </p>
                        ) : (
                            "Save Document"
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default DocumentEditor;