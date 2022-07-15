import "./chatlistbox.scss";
import Avatar from "./../../assets/img/avatar.png";
import { Typography } from "@mui/material";

const ChatListBox = ({ data, id }) => {
    return (
        <>
            <div className="ui-left-chat">
                <div className="ui-left-chat_img">
                    <img src={Avatar} alt="profile" />
                </div>
                <div className="ui-left-chat_msg">
                    <Typography variant="subtitle2">
                        {data.createdId._id === id
                            ? data.withCreatedId.firstName +
                              " " +
                              data.withCreatedId.lastName
                            : data.withCreatedId._id === id
                            ? data.createdId.firstName +
                              " " +
                              data.createdId.lastName
                            : null}
                    </Typography>
                    <Typography variant="subtitle2">
                        How are you? 4 min ago
                    </Typography>
                </div>
                {/* <div className="ui-left-chat_status online"></div> */}
                <div
                    className={
                        data.createdId._id === id
                            ? data.withCreatedId.status === "ONLINE"
                                ? "ui-left-chat_status online"
                                : "ui-left-chat_status offline"
                            : data.withCreatedId._id === id
                            ? data.createdId.status === "ONLINE"
                                ? "ui-left-chat_status online"
                                : "ui-left-chat_status offline"
                            : null
                    }
                ></div>
            </div>
        </>
    );
};

export default ChatListBox;
