import { v4 as uuid } from 'uuid';

export const fileNamer = (req, file: Express.Multer.File, callback) => {
  if (!file) return callback(new Error('Archivo vacío'), false);

  const fileExtension = file.mimetype.split('/')[1];
  //Renombrando el archivo
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
