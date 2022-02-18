import classNames from 'classnames';
import css from './tab.module.scss';

export interface TabProps {
    active?: boolean;
    contained?: boolean;
    dark?: boolean;
    icon?: string;
    label?: string;
    onClick?: () => void;
}

const Tab = ({ active, contained, dark, icon, label, onClick }: TabProps) => {
    return (
        <li
            className={classNames(css.tab, dark && css.dark, contained && css.contained, active && css.active)}
            onClick={onClick}
        >
            {icon && <img className={css.icon} src={icon} />}
            <span>{label}</span>
        </li>
    );
};

export default Tab;
