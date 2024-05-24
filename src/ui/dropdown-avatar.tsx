import { Avatar, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SecureStorageKeys } from '../shared/services';
import SecureStorageService from '../shared/services/secure-storage-service';
import { UserOutlined } from '@ant-design/icons';
import { RoutePaths } from '../shared/route-paths';

enum Keys {
  profile = 'profile',
  logout = 'logout',
}

const items: MenuProps['items'] = [
  {
    label: 'Перейти в профиль',
    key: Keys.profile,
  },
  {
    label: 'Выход',
    key: Keys.logout,
  },
];

export const DropdownAvatar = ({ src }: { src?: string }) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'logout': {
        navigate(RoutePaths.login);
        SecureStorageService.removeItem(SecureStorageKeys.TOKEN);
        break;
      }
      case 'profile': {
        navigate(RoutePaths.profile);
        break;
      }
      default:
        return;
    }
  };

  return (
    <Dropdown placement="bottom" menu={{ items, onClick: handleMenuClick }}>
      <Avatar src={src} icon={!src ? <UserOutlined /> : undefined} alt="Avatar" size={64} />
    </Dropdown>
  );
};
