import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@file-platform/ui';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  fileName: string;
  isPending: boolean;
}

export const DeleteConfirmDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  fileName,
  isPending,
}: DeleteConfirmDialogProps) => (
  <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Підтвердження видалення</AlertDialogTitle>
        <AlertDialogDescription>
          Ви впевнені, що хочете видалити файл "{fileName}"?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Скасувати</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} disabled={isPending}>
          {isPending ? 'Видалення...' : 'Видалити'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
