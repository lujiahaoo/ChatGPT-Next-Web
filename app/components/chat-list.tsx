import DeleteIcon from "../icons/delete.svg";
<<<<<<< HEAD
=======
import BotIcon from "../icons/bot.svg";

>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
import styles from "./home.module.scss";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

import { useChatStore } from "../store";

import Locale from "../locales";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { MaskAvatar } from "./mask";
import { Mask } from "../store/mask";

export function ChatItem(props: {
  onClick?: () => void;
  onDelete?: () => void;
  title: string;
  count: number;
  time: string;
  selected: boolean;
  id: number;
  index: number;
<<<<<<< HEAD
=======
  narrow?: boolean;
  mask: Mask;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
}) {
  return (
    <Draggable draggableId={`${props.id}`} index={props.index}>
      {(provided) => (
        <div
          className={`${styles["chat-item"]} ${
            props.selected && styles["chat-item-selected"]
          }`}
          onClick={props.onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
<<<<<<< HEAD
        >
          <div className={styles["chat-item-title"]}>{props.title}</div>
          <div className={styles["chat-item-info"]}>
            <div className={styles["chat-item-count"]}>
              {Locale.ChatItem.ChatItemCount(props.count)}
            </div>
            <div className={styles["chat-item-date"]}>{props.time}</div>
          </div>
          <div className={styles["chat-item-delete"]} onClick={props.onDelete}>
=======
          title={`${props.title}\n${Locale.ChatItem.ChatItemCount(
            props.count,
          )}`}
        >
          {props.narrow ? (
            <div className={styles["chat-item-narrow"]}>
              <div className={styles["chat-item-avatar"] + " no-dark"}>
                <MaskAvatar mask={props.mask} />
              </div>
              <div className={styles["chat-item-narrow-count"]}>
                {props.count}
              </div>
            </div>
          ) : (
            <>
              <div className={styles["chat-item-title"]}>{props.title}</div>
              <div className={styles["chat-item-info"]}>
                <div className={styles["chat-item-count"]}>
                  {Locale.ChatItem.ChatItemCount(props.count)}
                </div>
                <div className={styles["chat-item-date"]}>
                  {new Date(props.time).toLocaleString()}
                </div>
              </div>
            </>
          )}

          <div
            className={styles["chat-item-delete"]}
            onClickCapture={props.onDelete}
          >
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
            <DeleteIcon />
          </div>
        </div>
      )}
    </Draggable>
  );
}

<<<<<<< HEAD
export function ChatList() {
  const [sessions, selectedIndex, selectSession, removeSession, moveSession] =
    useChatStore((state) => [
      state.sessions,
      state.currentSessionIndex,
      state.selectSession,
      state.removeSession,
      state.moveSession,
    ]);
  const chatStore = useChatStore();
=======
export function ChatList(props: { narrow?: boolean }) {
  const [sessions, selectedIndex, selectSession, moveSession] = useChatStore(
    (state) => [
      state.sessions,
      state.currentSessionIndex,
      state.selectSession,
      state.moveSession,
    ],
  );
  const chatStore = useChatStore();
  const navigate = useNavigate();
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveSession(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chat-list">
        {(provided) => (
          <div
            className={styles["chat-list"]}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sessions.map((item, i) => (
              <ChatItem
                title={item.topic}
<<<<<<< HEAD
                time={item.lastUpdate}
=======
                time={new Date(item.lastUpdate).toLocaleString()}
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
                count={item.messages.length}
                key={item.id}
                id={item.id}
                index={i}
                selected={i === selectedIndex}
<<<<<<< HEAD
                onClick={() => selectSession(i)}
                onDelete={() => chatStore.deleteSession(i)}
=======
                onClick={() => {
                  navigate(Path.Chat);
                  selectSession(i);
                }}
                onDelete={() => {
                  if (!props.narrow || confirm(Locale.Home.DeleteChat)) {
                    chatStore.deleteSession(i);
                  }
                }}
                narrow={props.narrow}
                mask={item.mask}
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
