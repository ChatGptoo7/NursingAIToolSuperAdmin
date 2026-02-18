import { useState, useRef, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import "./uploadMedicalReports.scss";
export interface UploadMedicalReportModalProps{
    show:boolean,
    onClose:any,
    onUpload:any,
    isUploading:any
}
export const UploadPDF=({
  show,
  onClose,
  onUpload,
  isUploading,
}:UploadMedicalReportModalProps) =>{
  const fileInputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (!show) {
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [show]);

  const handleFiles = (selectedFiles:any) => {
    if (isUploading) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (file:any) => file.type === "application/pdf"
    );

    setFiles((prev:any) => [...prev, ...pdfFiles]);
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e:any) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index:number) => {
    if (isUploading) return; 
    setFiles((prev:any) => prev.filter((_:any, i:any) => i !== index));
  };

  const handleUpload = () => {
    if (!files.length || isUploading) return;
    onUpload(files);
  };

  return (
    <Modal
      show={show}
      onHide={isUploading ? null : onClose} 
      centered
      size="lg"
      backdrop={isUploading ? "static" : true} 
      keyboard={!isUploading}
    >
      {/* HEADER */}
      <Modal.Header closeButton={!isUploading}>
        <Modal.Title>Upload Medical Reports</Modal.Title>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body>
        {/* DROP ZONE */}
        <div
          className={`upload-drop-zone ${isUploading ? "disabled" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() =>
            !isUploading && fileInputRef.current.click()
          }
        >
          <div className="upload-icon">
            {isUploading ? (
              <Spinner animation="border" />
            ) : (
              "⬆️"
            )}
          </div>

          <p className="mb-1">
            <strong>
              {isUploading
                ? "Uploading PDFs..."
                : "Drag and drop PDF files here"}
            </strong>
          </p>

          {!isUploading && (
            <>
              <span>or</span>
              <Button
                variant="outline-primary"
                size="sm"
                disabled={isUploading}
              >
                Browse Files
              </Button>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            hidden
            onChange={handleBrowse}
          />
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="file-list mt-3">
            <p className="mb-2">{files.length} files selected</p>

            {files.map((file:any, index:number) => (
              <div key={index} className="file-item">
                <div>
                  <strong>{file.name}</strong>
                  <div className="file-size">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>

                {!isUploading && (
                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      {/* FOOTER */}
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onClose}
          disabled={isUploading}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          disabled={!files.length || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Uploading...
            </>
          ) : (
            `Upload (${files.length})`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
