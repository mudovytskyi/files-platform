export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? imageExtensions.includes(extension) : false;
};

export const getFileIcon = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'xls':
    case 'xlsx':
      return '📊';
    case 'zip':
    case 'rar':
      return '🗜️';
    case 'mp4':
    case 'avi':
    case 'mov':
      return '🎬';
    case 'mp3':
    case 'wav':
      return '🎵';
    default:
      return '📁';
  }
};
