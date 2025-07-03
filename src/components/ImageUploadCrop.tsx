import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { Upload, Crop as CropIcon, Save, X } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploadCropProps {
  currentImage: string;
  counselorName: string;
  onImageUpdate: (imagePath: string) => void;
  onClose: () => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ImageUploadCrop: React.FC<ImageUploadCropProps> = ({
  currentImage,
  counselorName,
  onImageUpdate,
  onClose
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  const generateFileName = (name: string): string => {
    // Convert name to Firstname-Lastname.jpg format
    const cleanName = name.trim().replace(/[^a-zA-Z\s]/g, '');
    const nameParts = cleanName.split(/\s+/);
    
    if (nameParts.length >= 2) {
      return `${nameParts[0]}-${nameParts[nameParts.length - 1]}.jpg`;
    } else {
      return `${nameParts[0]}.jpg`;
    }
  };

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      // Set canvas size to 500x500
      canvas.width = 500;
      canvas.height = 500;

      // Calculate scale factors
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Draw the cropped image scaled to 500x500
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        500,
        500
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          }
        }, 'image/jpeg', 0.9);
      });
    },
    []
  );

  const handleSaveCroppedImage = async () => {
    if (!imgRef.current || !completedCrop) {
      return;
    }

    setIsProcessing(true);

    try {
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      const fileName = generateFileName(counselorName);
      
      // Create a File object from the blob
      const file = new File([croppedImageBlob], fileName, { type: 'image/jpeg' });
      
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('image', file);
      formData.append('fileName', fileName);

      // In a real application, you would send this to your backend
      // For now, we'll simulate saving and create a local URL
      const imageUrl = URL.createObjectURL(croppedImageBlob);
      
      // Update the image path to match the expected format
      const imagePath = `/${fileName}`;
      onImageUpdate(imagePath);
      
      // In a real implementation, you would:
      // 1. Send the FormData to your backend endpoint
      // 2. The backend would save the file to the public folder
      // 3. Return the file path
      
      console.log('Image would be saved as:', fileName);
      console.log('File size:', file.size, 'bytes');
      
      onClose();
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Update preview canvas when crop changes
  React.useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = 200;
      canvas.height = 200;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        200,
        200
      );
    }
  }, [completedCrop]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
              Upload & Crop Image
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                Select Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors font-body">
                  <Upload className="w-4 h-4" />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500 font-body">
                  Will be saved as: {generateFileName(counselorName)}
                </span>
              </div>
            </div>

            {/* Current Image Preview */}
            {currentImage && !imgSrc && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Current Image
                </label>
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-32 h-32 rounded-lg object-cover border"
                />
              </div>
            )}

            {/* Crop Interface */}
            {imgSrc && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Crop Image (1:1 Aspect Ratio)
                  </label>
                  <div className="border rounded-lg overflow-hidden">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={1}
                      minWidth={100}
                      minHeight={100}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Preview (500x500px)
                  </label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    {completedCrop && (
                      <canvas
                        ref={previewCanvasRef}
                        className="rounded-lg border"
                        style={{
                          width: '200px',
                          height: '200px',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                    {!completedCrop && (
                      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 font-body">Crop preview</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2 font-heading">Instructions:</h4>
                    <ul className="text-sm text-blue-800 space-y-1 font-body">
                      <li>• Drag the corners to resize the crop area</li>
                      <li>• Drag the center to move the crop area</li>
                      <li>• The image will be resized to 500x500 pixels</li>
                      <li>• File will be saved as: {generateFileName(counselorName)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-body"
              >
                Cancel
              </button>
              {imgSrc && completedCrop && (
                <button
                  onClick={handleSaveCroppedImage}
                  disabled={isProcessing}
                  className="flex items-center space-x-2 px-6 py-2 text-white rounded-lg transition-colors font-body disabled:opacity-50"
                  style={{ backgroundColor: '#006DD2' }}
                  onMouseEnter={(e) => !isProcessing && (e.target.style.backgroundColor = '#0056B3')}
                  onMouseLeave={(e) => !isProcessing && (e.target.style.backgroundColor = '#006DD2')}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Cropped Image</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadCrop;