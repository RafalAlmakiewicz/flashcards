import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Notification({ message, success, setShowNotification }) {
  return (
    <div
      className={`notification notification-${success ? "success" : "danger"}`}
    >
      <FontAwesomeIcon
        icon={success ? "check-square" : "exclamation-triangle"}
      />
      <p>{message}</p>
      <button
        className={`btn btn-square btn-${success ? "success" : "danger"}`}
        onClick={() => setShowNotification(false)}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}
