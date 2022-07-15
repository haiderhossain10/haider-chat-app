import Avatar from "./../../assets/img/avatar.png";
import { Typography } from "@mui/material";

const UserProfileList = ({ img, name, status }) => {
    return (
        <>
            <div className="ui-left-chat">
                <div className="ui-left-chat_img">
                    <img src={Avatar} alt="profile" />
                </div>
                <div className="ui-left-chat_msg">
                    <Typography variant="subtitle2">{name}</Typography>
                </div>
                <div
                    className={
                        status === "ONLINE"
                            ? "ui-left-chat_status online"
                            : "ui-left-chat_status offline"
                    }
                ></div>
            </div>
        </>
    );
};

export default UserProfileList;
