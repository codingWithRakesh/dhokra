import { useState, useRef, useEffect } from 'react';
import { Upload, X, Play, Pause, RotateCw, Trash2 } from 'lucide-react';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('video')) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Simulate upload progress
  const handleUpload = () => {
    if (!videoFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Add to uploaded videos list
          setUploadedVideos(prev => [
            ...prev,
            {
              id: Date.now(),
              name: videoFile.name,
              url: previewUrl,
              size: (videoFile.size / (1024 * 1024)).toFixed(2),
              type: videoFile.type.split('/')[1].toUpperCase()
            }
          ]);
          // Reset upload form
          setVideoFile(null);
          setPreviewUrl('');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Delete uploaded video
  const handleDeleteVideo = (id) => {
    setUploadedVideos(prev => prev.filter(video => video.id !== id));
  };

  // Video control functions
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setVideoFile(null);
    setPreviewUrl('');
    setIsPlaying(false);
    setUploadProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      uploadedVideos.forEach(video => {
        URL.revokeObjectURL(video.url);
      });
    };
  }, [uploadedVideos]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Upload Center</h2>
      
      {/* Upload Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload New Video</h3>
        {!videoFile ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Drag & drop your video file here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
              Select Video
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Video Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={previewUrl}
                className="w-full max-h-[400px] object-contain"
                onClick={togglePlay}
              />
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <div className="flex-1 bg-gray-600 rounded-full h-1.5">
                    <div 
                      className="bg-emerald-500 h-1.5 rounded-full" 
                      style={{ width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : '0%' }}
                    />
                  </div>
                  
                  <button
                    onClick={() => videoRef.current.currentTime = 0}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Restart"
                  >
                    <RotateCw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Remove video"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* File Info */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Play className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{videoFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • {videoFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-right">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-6 py-2 rounded-md font-medium flex-1 ${
                  isUploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                } transition-colors`}
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
              
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Videos Section */}
      {uploadedVideos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Uploaded Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedVideos.map(video => (
              <div key={video.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-video bg-black">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/90 rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Delete video"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-800 truncate">{video.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">{video.size} MB</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{video.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;