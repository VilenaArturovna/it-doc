import { GetManyStaffItem, StaffGetMeDaoModel } from '../../../shared/types/api/generated';
import { Avatar, Descriptions, DescriptionsProps } from 'antd';
import { DateService } from '../../../shared/services';
import { roleMapper } from '../../../shared/mappers';
import React from 'react';
import styled from 'styled-components';

type Props = {
  user: StaffGetMeDaoModel | GetManyStaffItem;
};

export const StaffDescriptions = ({ user }: Props) => {
  const descriptionsItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Имя',
      children: `${user.lastname} ${user.firstname} ${user.middleName} `,
    },
    {
      key: '2',
      label: 'Телефон',
      children: user.phone,
    },
    {
      key: '3',
      label: 'Дата рождения',
      children: user.birthdate ? DateService.format(user.birthdate, true) : undefined,
    },
    {
      key: '4',
      label: 'Роль',
      children: roleMapper(user.role),
    },
    {
      key: '5',
      label: 'Аватар',
      children: <Avatar src={user.avatar} size="small" />,
    },
  ];

  return <StyledDescription items={descriptionsItems} column={1} bordered={true} size={'small'} />;
};

const StyledDescription = styled(Descriptions)`
  margin-bottom: 40px;
`;
