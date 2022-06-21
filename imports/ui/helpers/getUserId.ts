import { nanoid } from "nanoid";
import { useRef } from "react";
import { Types as _t } from '../Types';

function checkUserId(): string | null {
    const item = localStorage.getItem(_t.DEFAULT_KEY_USER_ID);
    return item ? JSON.parse(item) : item;
};

export default function getUserId(): string {

    const id = nanoid(21);
    const userId = useRef<string>(id);
    const getUserId = checkUserId();
    if (getUserId)
        userId.current = getUserId;
    else {
        localStorage.setItem(_t.DEFAULT_KEY_USER_ID, JSON.stringify(id));
        userId.current = id;
    }

    return userId.current;
}