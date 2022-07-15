import { IconButton, Typography } from "@mui/material";
import Avatar from "./../../assets/img/avatar.png";
import "./maincontent.scss";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
    useGetPostChatMutation,
    usePostChatMutation,
    usePostConversationMutation,
} from "../../api/services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { initChat } from "../../store/features/userSlice";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const MainContent = () => {
    const msgBoxRef = useRef();
    const dispatch = useDispatch();
    const getChatStateData = useSelector((state) => state.user.chat);
    const param = useParams();
    const [getChatsData] = useGetPostChatMutation();
    const [postChat] = usePostChatMutation();
    const [postConversation] = usePostConversationMutation();

    // jwt decode
    const token = JSON.parse(window.localStorage.getItem("_haiderLogin")).token;
    const tokenDecode = jwt_decode(token);

    // scroll top to bottom
    useEffect(() => {
        msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    });

    useEffect(() => {
        const postForGetChats = async () => {
            const res = await getChatsData({
                to: param.id,
                from: tokenDecode.id,
            });

            dispatch(initChat(res.data?.data));
        };
        postForGetChats();
    }, [getChatsData.isLoading, param.id, postChat]);

    // emoji button
    const [isShowedEmoji, setShowedEmoje] = useState(false);
    // store emoji
    const [getChatMsg, setChatMsg] = useState("");

    // emoji handler
    const onEmojiClick = (_, emojiObject) => {
        setChatMsg(getChatMsg + emojiObject.emoji);
    };

    return (
        <>
            <div className="ui-chat-box">
                <div className="ui-chat-box_header">
                    <div className="ui-chat-box_header_profile">
                        <img src={Avatar} alt="profile" />
                        <div className="ui-chat-box_header_profile_right">
                            <Typography variant="subtitle2">
                                Md Haider Hossain
                            </Typography>
                            <Typography variant="subtitle2">Online</Typography>
                        </div>
                    </div>
                </div>
                <div className="ui-chat-box_body" ref={msgBoxRef}>
                    {getChatStateData.length !== 0 &&
                        getChatStateData.map((item, index) => {
                            return (
                                <div key={index}>
                                    <>
                                        {item.to._id === param.id ? (
                                            <>
                                                <div className="ui-chat-box_body_card_box box-right">
                                                    <div className="ui-chat-box_body_card_content content-right">
                                                        <div>
                                                            <Typography variant="subtitle2">
                                                                {item.msg}
                                                                <p>
                                                                    {
                                                                        item.to
                                                                            .createdAt
                                                                    }
                                                                    <br />
                                                                    {item.seen ===
                                                                    "SEEN"
                                                                        ? "Seen"
                                                                        : "Unseen"}
                                                                </p>
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="ui-chat-box_body_card ">
                                                    <div className="ui-chat-box_body_card_box box-left">
                                                        <img
                                                            src={Avatar}
                                                            alt="profile"
                                                        />
                                                        <div className="ui-chat-box_body_card_content">
                                                            <div>
                                                                <Typography variant="subtitle2">
                                                                    {item.msg}
                                                                    <p>
                                                                        {
                                                                            item
                                                                                .to
                                                                                .createdAt
                                                                        }
                                                                    </p>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {/* <div className="ui-chat-box_body_seen">
                                            <img src={Avatar} alt="profile" />
                                        </div> */}
                                    </>
                                </div>
                            );
                        })}
                </div>
                <div className="ui-chat-box_input">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            const conData = {
                                createdId: tokenDecode.id,
                                withCreatedId: param.id,
                            };

                            await postConversation(conData);

                            const formData = {
                                msg: getChatMsg,
                                to: param.id,
                                from: tokenDecode.id,
                            };

                            await postChat(formData);
                            setChatMsg(" ");
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type..."
                            value={getChatMsg}
                            onChange={async (e) => {
                                setChatMsg(e.target.value);
                            }}
                        />
                    </form>
                    <div className="ui-chat-box_input_emoji">
                        <IconButton
                            size="large"
                            onClick={() => {
                                setShowedEmoje(!isShowedEmoji);
                            }}
                            className={isShowedEmoji ? "selected" : ""}
                        >
                            <BsFillEmojiSmileFill />
                        </IconButton>
                        {isShowedEmoji && (
                            <Picker onEmojiClick={onEmojiClick} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContent;
