
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Check, AlertCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const DataUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "pending",
        id: Math.random().toString(36).substring(2, 9)
      }));
      
      setFiles([...files, ...newFiles]);
      
      toast({
        title: "Files added",
        description: `${newFiles.length} file(s) added to upload queue`,
      });
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select files first",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        
        // Mark all files as completed
        setFiles(files.map(file => ({
          ...file,
          progress: 100,
          status: "completed"
        })));
        
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${files.length} file(s)`,
          variant: "default",
        });
      }
    }, 300);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Data Uploader
          </CardTitle>
          <CardDescription>
            Upload patient data files for ML processing
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div 
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Drag and drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground">
              Supports CSV, JSON, and Excel files up to 50MB
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Files ({files.length})</div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                    <div className="flex items-center">
                      {file.status === "completed" ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : file.status === "error" ? (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      ) : (
                        <div className="h-4 w-4 mr-2" />
                      )}
                      <div>
                        <div className="text-sm truncate max-w-[200px]">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {uploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleUpload} 
                  disabled={uploading}
                  className="w-full sm:w-auto"
                >
                  {uploading ? "Uploading..." : "Upload Files"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataUploader;
