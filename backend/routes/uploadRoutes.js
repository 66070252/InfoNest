import uploadController from '../controllers/uploadController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js'; 

const useUploadRoute = (router) => {
/**
 * @swagger
 * tags:
 *   - name: Upload
 *     description: API for file uploads
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image file
 *     description: Allows users to upload an image file. Requires a bearer token.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully, returns the image URL path.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: /uploads/myimage.jpg
 *       400:
 *         description: No file was uploaded.
 *       401:
 *         description: Unauthorized.
 */


  router.post('/upload', authMiddleware(), uploadMiddleware.single('image'), uploadController.uploadImage
  );
};

export default useUploadRoute;