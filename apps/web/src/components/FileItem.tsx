import { Button, Card } from '@file-platform/ui';
import { trpc } from '@utils/trpc';
import { FilePlatform } from '@file-platform/shared-lib/src';
import { useEffect, useState } from 'react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { formatDateString } from '@utils/date-time.utils';
import { getFileIcon, isImageFile } from '@utils/file.utils';
import Image from 'next/image';

interface FileItemProps {
  file: FilePlatform;
}

export function FileItem({ file }: FileItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedDate = formatDateString(file.createdAt);
  const showImage = isImageFile(file.name) && file.url && !imageError;

  const utils = trpc.useContext();
  const deleteMutation = trpc.deleteFile.useMutation({
    onSuccess: () => {
      void utils.getFiles.invalidate();
    },
    onError: (error) => {
      console.error('Помилка видалення файлу:', error);
    },
  });

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: file.id });
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setImageError(false);
  }, [file.url]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Ліва частина - зображення/іконка та інформація */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Зображення або іконка */}
          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {showImage ? (
              <Image
                src={file.url}
                alt={file.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <span className="text-2xl" role="img" aria-label="File icon">
                {isImageFile(file.name) ? '🖼️' : getFileIcon(file.name)}
              </span>
            )}
          </div>

          {/* Інформація про файл */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium truncate" title={file.name}>
              {file.name}
            </h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
            {file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Переглянути файл
              </a>
            )}
          </div>
        </div>

        {/* Права частина - кнопка видалення */}
        <div className="flex-shrink-0">
          <Button
            variant={deleteMutation.isPending ? 'ghost' : 'destructive'}
            onClick={handleDeleteClick}
            disabled={deleteMutation.isPending}
            aria-label={`Видалити файл ${file.name}`}
          >
            {deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
          </Button>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDelete}
        fileName={file.name}
        isPending={deleteMutation.isPending}
      />
    </Card>
  );
}
