import { ChangeEvent, FormEvent, useState } from "react";
import "./comments.css";

// Simulamos un usuario logueado o no logueado con una constante
const loggedInUser: string | null = "Juan Pérez"; // Cambiar a `null` si no está logueado

// Simulando que el usuario es admin
const isAdmin = true; // Cambia esto a false para simular que el usuario no es admin

type Comment = {
  name: string;
  text: string;
  date: string;
  reply?: {
    name: string;
    text: string;
    date: string;
  };
};

export default function Comments() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [replyText, setReplyText] = useState(""); // Estado para la respuesta
  const [replyIndex, setReplyIndex] = useState<number | null>(null); // Para saber qué comentario se está respondiendo

  // Maneja el envío de un nuevo comentario
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (text.trim() !== "") {
      const newComment: Comment = {
        name: loggedInUser ?? "Anónimo", // Si no hay usuario logueado, usar "Anónimo"
        text: text,
        date: new Date().toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };
      setComments([...comments, newComment]);
      setText("");
    }
  }

  // Maneja el cambio en el campo de texto del comentario
  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  // Maneja el envío de una respuesta a un comentario
  function handleReplySubmit(event: FormEvent<HTMLFormElement>, index: number) {
    event.preventDefault();

    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      const newReply = {
        name: loggedInUser ?? "Anónimo",
        text: replyText,
        date: new Date().toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };

      updatedComments[index].reply = newReply; // Solo se permite una respuesta
      setComments(updatedComments);
      setReplyText(""); // Limpiar el campo de respuesta
      setReplyIndex(null); // Cerrar el campo de respuesta
    }
  }

  return (
    <div className="comments">
      <h1>Comentarios</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          <input
            className="textbox"
            id="text"
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Escribe tu comentario"
          />
        </label>
        <button className="MainButton" type="submit">
          Comentar
        </button>
      </form>

      <h3>Últimos realizados</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.name}</strong> ({comment.date}): {comment.text}
            {/* Mostrar la respuesta si existe */}
            {comment.reply && (
              <ul>
                <li className="respuesta">
                  <strong>{comment.reply.name}</strong> ({comment.reply.date}):{" "}
                  {comment.reply.text}
                </li>
              </ul>
            )}
            {/* Mostrar el campo de respuesta si aún no hay respuesta */}
            {!comment.reply && isAdmin && (
              <>
                {replyIndex === index ? (
                  <form onSubmit={(e) => handleReplySubmit(e, index)}>
                    <input
                      className="textbox"
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe una respuesta"
                    />
                    <button className="replyButton" type="submit">
                      Responder
                    </button>
                  </form>
                ) : (
                  <button
                    className="replyButton"
                    onClick={() => setReplyIndex(index)}
                  >
                    Responder
                  </button>
                )}
              </>
            )}
            {/* Botón de borrar siempre visible */}
            {isAdmin && <button className="delete">Borrar</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
