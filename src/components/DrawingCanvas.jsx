import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const DrawingCanvas = ({ isOpen, onClose }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('#3B82F6');
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const overlayRef = useRef(null);

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  // Helper function to get coordinates from both mouse and touch events
  const getCoordinates = (e) => {
    if (e.touches && e.touches[0]) {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      };
    }
  };

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      context.scale(2, 2);
      
      // Set initial context properties
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
      
      contextRef.current = context;
    }
  }, [isOpen, brushColor, brushSize]);

  // Handle ESC key and click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Prevent scrolling while drawing
    const preventScroll = (e) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Add touch event listeners with passive: false to allow preventDefault
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('touchstart', preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Restore scrolling
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('touchstart', preventScroll);
    };
  }, [isOpen, onClose, isDrawing]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const coords = getCoordinates(e);
    setCurrentPath([{ x: coords.x, y: coords.y }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const coords = getCoordinates(e);
    const newPoint = { x: coords.x, y: coords.y };
    
    setCurrentPath(prev => [...prev, newPoint]);
    
    if (contextRef.current) {
      const context = contextRef.current;
      context.beginPath();
      context.moveTo(currentPath[currentPath.length - 1]?.x || coords.x, currentPath[currentPath.length - 1]?.y || coords.y);
      context.lineTo(coords.x, coords.y);
      context.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (isDrawing && currentPath.length > 0) {
      setDrawingHistory(prev => [...prev, { path: currentPath, color: brushColor, size: brushSize }]);
      setCurrentPath([]);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (contextRef.current) {
      const context = contextRef.current;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      setDrawingHistory([]);
    }
  };

  const undo = () => {
    if (drawingHistory.length > 0) {
      const newHistory = drawingHistory.slice(0, -1);
      setDrawingHistory(newHistory);
      
      // Redraw everything
      if (contextRef.current) {
        const context = contextRef.current;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        newHistory.forEach(({ path, color, size }) => {
          context.strokeStyle = color;
          context.lineWidth = size;
          context.beginPath();
          path.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x, point.y);
            } else {
              context.lineTo(point.x, point.y);
            }
          });
          context.stroke();
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={overlayRef}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <motion.div
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎨
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Digital Drawing Canvas
              </h2>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Color and Size Controls */}
              <div className="flex items-center space-x-4">
                {/* Color Picker */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Color:</span>
                  <div className="flex space-x-1">
                    {colors.map((color) => (
                      <motion.button
                        key={color}
                        className={`w-6 h-6 rounded-full border-2 ${
                          brushColor === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBrushColor(color)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Brush Size */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Size:</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-6 text-center">
                    {brushSize}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={undo}
                  disabled={drawingHistory.length === 0}
                  className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ↩️ Undo
                </motion.button>
                <motion.button
                  onClick={clearCanvas}
                  className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🗑️ Clear
                </motion.button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
              <canvas
                ref={canvasRef}
                className="w-full h-96 cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                onTouchCancel={stopDrawing}
              />
            </div>

            {/* Fun Instructions */}
            <motion.div
              className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-2xl mb-2"
                  animate={{ bounce: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                >
                  ✨
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Let's get creative!</strong> Draw something fun, doodle, or just experiment with colors. 
                  This is your digital canvas - make it yours! 🎨 <br />
                  <span className="text-xs text-gray-500 mt-1 block">💡 Works on both desktop and mobile devices!</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DrawingCanvas;
