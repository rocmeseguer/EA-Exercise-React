interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal de confirmación CONTROLADO: no tiene estado propio. Si está abierto o
 * cerrado lo decide el padre (prop `isOpen`), normalmente con un `useState` local.
 * daisyUI abre el modal con la clase `modal-open`.
 */
export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps): JSX.Element => (
  <div className={`modal ${isOpen ? 'modal-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
    <div className="modal-box">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="py-4">{message}</p>
      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" className="btn btn-error" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
    {/* Pulsar fuera del cuadro también cancela. */}
    <button type="button" className="modal-backdrop" aria-label="Cerrar" onClick={onCancel} />
  </div>
);
