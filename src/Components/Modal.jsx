import { useRef, useEffect } from "react";
import TaskDetailedModal from "./TaskDetailedModal";
import { useCustomUseContext } from "../ContextProvider";
import DropdownMenu from "./DropdownMenu";
import AddTaskModal from "./AddTaskModal";
import AddBoardModal from "./AddBoardModal";
import AddColumnModal from "./AddColumnModal";

const Modal = () => {
  const taskRef = useRef();
  const {
    modal,
    setModal,
    currentTask,
    setModalVisible,
    setCurrentColumnIndex,
  } = useCustomUseContext();
  function handleOutsideClick(e) {
    // console.log(taskRef.current?.contains(e.target));
    if (!taskRef.current?.contains(e.target)) setModalVisible(false);
    setModal("");
  }

  const getModal = () => {
    switch (modal) {
      case "TaskDetailedModal":
        return <TaskDetailedModal />;
        break;
      case "AddTaskModal":
        return <AddTaskModal />;
        break;
      case "AddBoardModal":
        return <AddBoardModal />;
        break;
      case "AddColumnModal":
        return <AddColumnModal />;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document
      .querySelector(".modal_bg")
      .addEventListener("click", handleOutsideClick);
    return () => {
      console.log("modal unmounted");
      // document.querySelector(".modal_bg").removeEventListener("click", handleOutsideClick);
      setCurrentColumnIndex(null);
    };
  }, [currentTask]);

  return (
    <>
      <div className="modal_bg"></div>
      <div className="modal" id="modal" ref={taskRef}>
        {getModal()}
      </div>
    </>
  );
};

export default Modal;
