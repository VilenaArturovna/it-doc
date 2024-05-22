import { useState } from 'react';
import { useFetchClientsQuery } from '../../../app/api/clients-api';
import { StyledSpin } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';

export const Clients = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchClientsQuery({ limit: 10, page });

  return (
    <div>
      {isLoading && <StyledSpin />}
      {data && !data.data.length && (
        <EmptyComponent createNewTitle={'Добавить клиента'} link={RoutePaths.clientNew} />
      )}
    </div>
  );
};
