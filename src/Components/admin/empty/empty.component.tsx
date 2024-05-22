import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  link: string;
  createNewTitle: string;
};

export const EmptyComponent = ({ link, createNewTitle }: PropsType) => {
  const navigate = useNavigate();
  const onClick = () => navigate(link);

  return (
    <Empty
      image="https://img.freepik.com/free-vector/product-hunt-concept-illustration_114360-594.jpg?t=st=1716369422~exp=1716373022~hmac=34839880bedf6bdeeeadb8004a59c6e1af9154be97a9814862ed31fab4d274e0&w=1380"
      imageStyle={{ height: 200 }}
      description={<span>Здесь пока пусто</span>}
    >
      <Button type="primary" onClick={onClick}>
        {createNewTitle}
      </Button>
    </Empty>
  );
};
