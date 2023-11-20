import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "../hooks/useMemoList";

export const App: FC = () => {
    // カスタムフックからそれぞれ取得
    const {memos, addTodo, deleteTodo} = useMemoList();

    // テキストボックスState
    const [text, setText] = useState<string>("");

    // メモ一覧State
    // const [memos, setMemos] = useState<string[]>([]);

    // テキストボックス入力時に入力内容をStateに設定
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // [追加]ボタン押下時
    const onClickAdd = () => {
        // // State変更を正常に検知させるため新たな配列を生成
        // const newMemos = [...memos];
        
        // // テキストボックスの入力内容をメモ配列に追加
        // newMemos.push(text);
        // setMemos(newMemos);

        // カスタムフックのメモ追加ロジック実行
        addTodo(text);

        // テキストボックスを初期化
        setText("");
    };

    // [削除]ボタン押下時（何番目が押されたかを引数で受け取る）
    // const onClickDelete = (index: number) => {
    const onClickDelete = useCallback((index: number) => {
    //     // State変更を正常に検知させるため新たな配列を生成
    //     const newMemos = [...memos];

    //     // メモ配列から該当の要素を削除
    //     newMemos.splice(index, 1);
    //     setMemos(newMemos);
    // }, [memos]);

        // カスタムフックのメモ削除ロジック実行
        deleteTodo(index);
    }, [deleteTodo]);

    return (
        <div>
            <h1>簡単メモアプリ</h1>
            <p>▼メモ内容▼</p>
            <input type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>追加</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} />
            {/* <SContainer>
                <p>メモ一覧</p>
                <ul>
                    {memos.map((memo, index) => (
                        <li key={memo}>
                            <SMemoWrapper>
                                <p>{memo}</p>
                                <SButton onClick={() => onClickDelete(index)}>削除</SButton>
                            </SMemoWrapper>
                        </li>
                    ))}
                </ul>
            </SContainer> */}
        </div>
    );
};

const SButton = styled.button`
    margin-left: 16px;
`;

// const SContainer = styled.div`
//     border: solid 1px #ccc;
//     padding: 16px;
//     margin: 8px;
// `;

// const SMemoWrapper = styled.div`
//     display: flex;
//     align-items: center;
// `;