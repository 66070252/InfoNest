import uploadController from '../controllers/uploadController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js'; 

const useUploadRoute = (router) => {
  router.post('/upload', authMiddleware(), uploadMiddleware.single('image'), uploadController.uploadImage
  );
};

export default useUploadRoute;