import { Button, Card } from '@file-platform/ui';
import { trpc } from '@utils/trpc';
import { FilePlatform } from '@file-platform/shared-lib/src';
import { memo, useCallback, useMemo, useState } from 'react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface FileItemProps {
  file: FilePlatform;
}

export const FileItem = memo(function FileItem({ file }: FileItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formattedDate = new Date(file.createdAt).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const utils = trpc.useContext();
  const deleteMutation = useMemo(() => {
    return trpc.deleteFile.useMutation({
      onSuccess: () => {
        void utils.getFiles.invalidate();
      },
      onError: (error) => {
        console.error('Помилка видалення файлу:', error);
        // Додати повідомлення про помилку для користувача
      },
    });
  }, []);

  const handleDeleteClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteMutation.mutate({ id: file.id });
    setIsDialogOpen(false);
  }, [file.id]);

  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">{file.name}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <Button
        variant="destructive"
        onClick={handleDeleteClick}
        disabled={deleteMutation.isPending}
        aria-label={`Видалити файл ${file.name}`}
      >
        {deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
      </Button>

      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDelete}
        fileName={file.name}
        isPending={deleteMutation.isPending}
      />
    </Card>
  );
});
