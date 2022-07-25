import * as NumberList from './list-variants/number';
import * as BulletedList from './list-variants/bulleted';
import * as CheckList from './list-variants/check';
import * as CompoundList from './list-variants/compound';
import { FC } from 'react';

type TList = FC &
    NumberList.NumberListType &
    BulletedList.SimpleListType &
    CheckList.CheckListType &
    CompoundList.CompoundListType;

const List: TList = ({ children }) => {
    return <>{children}</>;
};

List.NumberList = NumberList.NumberList;
List.BulletedList = BulletedList.BulletedList;
List.CheckList = CheckList.CheckList;
List.CompoundList = CompoundList.CompoundList;

export default List;
