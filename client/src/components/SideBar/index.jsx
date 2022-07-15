import Avatar from "./../../assets/img/avatar.png";
import "./sidebar.scss";
import IconButton from "@mui/material/IconButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { FormControl, Input, InputAdornment, Typography } from "@mui/material";
import ChatListBox from "../ChatListBox";
import { Link } from "react-router-dom";
import {
    useGetConversationQuery,
    useGetUsersQuery,
} from "../../api/services/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
    initConversationUser,
    searchUser,
} from "../../store/features/userSlice";
import { useState } from "react";
import UserProfileList from "../UserProfileList";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const SideBar = () => {
    const dispatch = useDispatch();
    const getSearchedData = useSelector((state) => state.user.searchedUser);
    const getConversationData = useSelector((state) => state.user.conversation);

    // api
    const getUser = useGetUsersQuery();
    const getConversation = useGetConversationQuery();

    // console.log(getConversation.data);

    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    // jwt decode
    const token = JSON.parse(window.localStorage.getItem("_haiderLogin")).token;
    const tokenDecode = jwt_decode(token);

    // find user handler
    const findUserHandler = (e) => {
        setSearch(e.target.value);
        const searchData = getUser.data.data.filter((item) => {
            if (item._id !== tokenDecode.id) {
                if (
                    `${item.firstName} ${item.lastName}`
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase())
                ) {
                    return item;
                }
            }
        });

        if (search.length > 1) {
            dispatch(searchUser(searchData));
            setIsSearch(true);
        } else {
            dispatch(searchUser([]));
            setIsSearch(false);
        }
    };

    // filter conversations
    useEffect(() => {
        if (typeof getConversation.data !== "undefined") {
            const conversation = getConversation.data.filter((item) => {
                if (
                    item.createdId._id === tokenDecode.id ||
                    item.withCreatedId._id === tokenDecode.id
                ) {
                    return item;
                }
            });

            dispatch(initConversationUser(conversation));
        }
    }, [getConversation.isLoading]);

    return (
        <div>
            <div className="ui-sidebar">
                <div className="ui-sidebar_head">
                    <div className="ui-sidebar_head-img">
                        <Link to="/">
                            <img src={Avatar} alt="profile" />
                        </Link>
                    </div>
                    <IconButton aria-label="delete">
                        <BsThreeDotsVertical />
                    </IconButton>
                </div>
                <div className="ui-sidebar_find-box">
                    <FormControl variant="standard" fullWidth>
                        <Input
                            placeholder="Search..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <CgSearch />
                                </InputAdornment>
                            }
                            onChange={findUserHandler}
                            value={search}
                        />
                    </FormControl>
                </div>
                <div className="ui-sidebar_chat-profile-list">
                    {isSearch ? (
                        <>
                            <Typography marginTop={2} variant="subtitle2">
                                Search Results:
                            </Typography>
                            {getSearchedData.length !== 0
                                ? getSearchedData.map((item, index) => {
                                      return (
                                          <>
                                              <Link to={`/chat/${item._id}`}>
                                                  <UserProfileList
                                                      key={index}
                                                      name={`${item.firstName} ${item.lastName}`}
                                                      status={item.status}
                                                  />
                                              </Link>
                                          </>
                                      );
                                  })
                                : ""}
                        </>
                    ) : (
                        <>
                            {getConversation.isLoading
                                ? "Loading..."
                                : getConversationData.map((item, index) => {
                                      return (
                                          <Link
                                              to={`/chat/${
                                                  item.createdId._id ===
                                                  tokenDecode.id
                                                      ? item.withCreatedId._id
                                                      : item.withCreatedId
                                                            ._id ===
                                                        tokenDecode.id
                                                      ? item.createdId._id
                                                      : null
                                              }`}
                                              key={index}
                                          >
                                              <ChatListBox
                                                  data={item}
                                                  id={tokenDecode.id}
                                              />
                                          </Link>
                                      );
                                  })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
