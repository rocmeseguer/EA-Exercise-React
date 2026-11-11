import { ChangeEvent, FormEvent, RefObject, useRef, useState } from 'react';
import { Todo, TodoFormValues } from '../models/todo.model';

/**
 * Controller del FORMULARIO de alta. Estado LOCAL (`useState`): los valores
 * de los inputs son efímeros y solo interesan a este formulario.
 */

const INITIAL_VALUES: TodoFormValues = { title: '', description: '' };

type FormFieldChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface UseTodoFormResult {
  values: TodoFormValues;
  isSubmitting: boolean;
  canSubmit: boolean;
  titleRef: RefObject<HTMLInputElement>;
  handleChange: (event: FormFieldChange) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

/** Función pura de validación. */
export const isValidTodoForm = (values: TodoFormValues): boolean => values.title.trim().length > 0;

export const useTodoForm = (onSubmit: (values: TodoFormValues) => Promise<Todo | null>): UseTodoFormResult => {
  const [values, setValues] = useState<TodoFormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const titleRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  // Inmutabilidad: creamos un objeto NUEVO copiando el anterior y cambiando
  // solo el campo editado (propiedad computada `[name]`).
  // Actualización funcional (`prev => ...`) para partir siempre del valor más reciente.
  const handleChange = ({ target: { name, value } }: FormFieldChange): void =>
    setValues((prev: TodoFormValues): TodoFormValues => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault(); // Evita que el navegador recargue la página.
    if (!isValidTodoForm(values) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const created: Todo | null = await onSubmit(values);
      // Solo limpiamos el formulario si el servidor confirmó la creación:
      // si falló, el usuario conserva lo que había escrito.
      if (created !== null) {
        setValues(INITIAL_VALUES);
        titleRef.current?.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, isSubmitting, canSubmit: isValidTodoForm(values) && !isSubmitting, titleRef, handleChange, handleSubmit };
};
