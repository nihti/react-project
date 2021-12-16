import React, { useState } from 'react';
import _ from 'lodash';
import { Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TrainingsChart(props) {
    const [open, setOpen] = useState(false);
    const data = props.data; 

    /** 
     * Käsitellään propsina saatu data lodashilla,
     * ensin groupataan objektien activity attribuutilla uudeksi listaksi,
     * sitten mäpätään uusi lista, activity pysyy samana mutta objektien
     * duration summataan uudessa listassa yhteen
     * import: https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
     * groupBy: https://stackoverflow.com/questions/57250239/how-to-groupby-objects-using-lodash-and-map-over-the-list-react
     * sumBy: https://blog.kevinchisholm.com/javascript/lodash-sumby-introduction/ 
     * */ 
    const res = _(data)
        .groupBy('activity')
        .map((groupedList, activity) => ({
            activity: activity, 
            duration: _.sumBy(groupedList, groupItem => {
                return groupItem.duration
            })
        }))
        .value();

    const closeDialog = () => {
        setOpen(false);
    }

    const copen = () => {
        setOpen(true);
    }
    
    return (
        <Fragment>
            <Button onClick={ copen } size="small">Chart</Button>
            <Dialog open={open} onClose={ closeDialog } fullWidth >
                <DialogContent>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: 'auto' }}>
                        <DialogTitle style={{ textAlign: 'center' }}>Training chart</DialogTitle>
                        <ResponsiveContainer height='70%' >
                            <BarChart width={50} height={15} data={res}>
                                <Bar         
                                    dataKey="duration" 
                                    fill="#8884d8"
                                    width={50} />
                                <XAxis dataKey="activity" />
                                <YAxis dataKey="duration" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={ closeDialog }></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
