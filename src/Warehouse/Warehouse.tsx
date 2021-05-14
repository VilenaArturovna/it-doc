import {DataGrid, GridCellParams, GridColDef, GridRowsProp} from '@material-ui/data-grid';
import {ItemType} from "./state/warehouse-reducer";
import {Button} from "@material-ui/core";

const details: Array<ItemType> = [
    {
        id: '1',
        balance: 5,
        batchPartNumber: '4567-56',
        category: 'cartridge',
        compatibility: 'ddddddd',
        expenditure: 678,
        pack: 10,
        pricePack: 4200,
        priceIn: 400,
        reserveR: 5,
        reserveS: 2,
        measureUnit: 'gfhjf',
        name: 'KGY-2',
        vendor: 'Brother'
    },
    {
        id: '2',
        balance: 15,
        batchPartNumber: 'fgg67-56',
        category: 'MFD',
        compatibility: 'fls8-4',
        expenditure: 34,
        pack: 3,
        pricePack: 54200,
        priceIn: 15000,
        reserveR: 2,
        reserveS: 1,
        measureUnit: 'sfvv',
        name: 'SRC-4000',
        vendor: 'Kyocera'
    }
]

const columns: GridColDef[] = [
    {field: 'col1', headerName: 'ID',  flex: 0.5},
    {field: 'col2', headerName: 'Партийный номер', flex: 1},
    {field: 'col3', headerName: 'Рубрика',  flex: 1},
    {field: 'col4', headerName: 'Производитель',  flex: 1},
    {field: 'col5', headerName: 'Наименование позиции',  flex: 1},
    {field: 'col6', headerName: 'Остаток',  flex: 1},
    {field: 'col7', headerName: 'Единица измерения',  flex: 1},
    {field: 'col8', headerName: 'Цена входящая',  flex: 1},
    {field: 'col9', headerName: 'Цена упаковки',  flex: 1},
    {field: 'col10', headerName: 'Количество в упаковке',  flex: 1},
    {field: 'col11', headerName: 'Совместимость',  flex: 1},
    {field: 'col12', headerName: 'Расход',  flex: 1},
    {field: 'col13', headerName: 'Резерв-р',  flex: 1},
    {field: 'col14', headerName: 'Критический запас', flex: 1},
    {field: 'col15', headerName: 'Кнопки',  flex: 1, renderCell: (params: GridCellParams) => (
            <strong>
                {}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                >
                    Open
                </Button>
            </strong>
        )},
];

const rows2: GridRowsProp = details.map(d => ({
    id: d.id, col1: d.id, col2: d.batchPartNumber, col3: d.category,
    col4: d.vendor, col5: d.name, col6: d.balance, col7: d.measureUnit, col8: d.priceIn, col9: d.pricePack,
    col10: d.pack, col11: d.compatibility, col12: d.expenditure, col13: d.reserveR, col14: d.reserveS
}));
export const Warehouse = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>

                    <DataGrid columns={columns} rows={rows2}/>


        </div>
    )
}
