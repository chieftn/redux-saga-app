import * as React from 'react';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';

export const DetailsListExperiment: React.FC = () => {
    const data = [
        {
            name: 'name1',
            value1: 'value1',
            value2: 'value2',
        },
        {
            name: 'name1',
            value1: 'value1',
            value2: 'value2'
        },
    ];

    // tslint:disable-next-line: no-any
    const renderSubValue = (item: any): JSX.Element => {
        return (
            <div>
                <div>name</div>
                <div>
                    hellllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllo
                </div>
            </div>
        );
    };

    return (
        <div>
            <DetailsList
                items={data}
                columns={[
                    {
                        data: 'string',
                        fieldName: 'name',
                        isPadded: true,
                        isResizable: true,
                        isRowHeader: true,
                        isSorted: true,
                        isSortedDescending: false,
                        key: 'column1',
                        maxWidth: 350,
                        minWidth: 210,
                        name: 'Name',
                        onRender: renderSubValue,
                        sortAscendingAriaLabel: 'Sorted A to Z',
                        sortDescendingAriaLabel: 'Sorted Z to A',
                    },
                    {
                        data: 'string',
                        fieldName: 'value1',
                        isPadded: true,
                        isResizable: true,
                        isRowHeader: true,
                        isSorted: true,
                        isSortedDescending: false,
                        key: 'column2',
                        maxWidth: 350,
                        minWidth: 210,
                        name: 'Value1'
                    },
                    {
                        data: 'string',
                        fieldName: 'value2',
                        isPadded: true,
                        isResizable: true,
                        isRowHeader: true,
                        isSorted: true,
                        isSortedDescending: false,
                        key: 'column2',
                        maxWidth: 350,
                        minWidth: 210,
                        name: 'Value2'
                    },
                ]}
            />
        </div>
    );
};
