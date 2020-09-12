import React, { useState, useEffect } from 'react'
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, makeStyles, Divider } from '@material-ui/core'
import Loading from "../Components/loading";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, AreaChart, Area, ResponsiveContainer } from 'recharts';
import Axios from 'axios';
import { url } from '../config/config';
import TodayIcon from '@material-ui/icons/Today';
import SubjectIcon from '@material-ui/icons/Subject';
import ViewListIcon from '@material-ui/icons/ViewList';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Label from '@material-ui/icons/Label';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: 100,
        marginRight: 20,
        [theme.breakpoints.down("sm")]: {
            marginLeft: 75,
        },
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 190,
    },
    tree: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

function Statistic(props) {
    const classes = useStyles();
    const [teacherList, setTeacherList] = useState([]);
    const [teacher, setTeacher] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);

    useEffect(() => {
        setTeacherList(props.stateTeacherList)
    }, [props.stateTeacherList])

    const handleTeacher = async (e) => {
        setTeacher(e.target.value)
        setLoading(true)
        const response = await Axios.get(`${url}/api/getteacherinfo/${e.target.value}`);
        if (response.data.success) {
            setData(response.data.data)
        }
        if (response.data.error) {
            toast.warn("no data found")
        }
        setLoading(false)
    }
    const CustomizedAxisTick = (props) => {

        const { x, y, stroke, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-27)">{
                payload.value
                }</text>
            </g>
        );

    }
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid container justify='space-between'>
                    <Typography variant="h4" style={{ fontWeight: "bold", paddingTop: 12 }}>Statistic</Typography>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-teacher-label">Select teacher</InputLabel>
                        <Select
                            labelId="select-teacher"
                            onChange={handleTeacher}
                            value={teacher}
                        >
                            {teacherList.map(p =>
                                <MenuItem key={p.uid} value={p.uid}>{p.userName}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    <Divider style={{ width: '100%', marginBottom: 12 }} />
                 {loading?<Loading/>:  data ? <Grid container  >
                        <Grid sm={7} style={{ minHeight: 450 }}>
                            <ResponsiveContainer>
                                <AreaChart data={data?data.time:""} margin={{
                                     bottom: 100,left:30,right:20
                                }} >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" tick={<CustomizedAxisTick />} />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="times" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Grid>
                        <Grid sm={5}>
                            <Typography variant='h6'>Total uploaded questions is {data ? data.total : "loading..."}</Typography>
                            {/* <Typography variant='h6'>Total uploaded questions is {date.total}</Typography> */}
                            {data ? <TreeView
                                className={`${classes.tree}`}
                                defaultExpanded={['1']}
                                defaultCollapseIcon={<ArrowDropDownIcon />}
                                defaultExpandIcon={<ArrowRightIcon />}
                                defaultEndIcon={<div style={{ width: 24 }} />}
                            >
                                <StyledTreeItem nodeId="1" labelText="Date" labelIcon={TodayIcon}>
                                    {data ? data.time.map((p, i) =>
                                        <StyledTreeItem
                                            key={i}
                                            nodeId={`times${i}`}
                                            labelText={p.time}
                                            labelIcon={Label}
                                            labelInfo={p.times}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    ) : ""}
                                </StyledTreeItem>
                                <StyledTreeItem nodeId="2" labelText="Stream" labelIcon={ViewListIcon}>
                                    {data ? data.stream.map((p, i) =>
                                        <StyledTreeItem
                                            key={i}
                                            nodeId={`stream${i}`}
                                            labelText={p.stream}
                                            labelIcon={Label}
                                            labelInfo={p.times}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    ) : ""}
                                </StyledTreeItem>
                                <StyledTreeItem nodeId="3" labelText="Subject" labelIcon={SubjectIcon}>
                                    {data ? data.subject.map((p, i) =>
                                        <StyledTreeItem
                                            key={i}
                                            nodeId={`subject${i}`}
                                            labelText={p.subject}
                                            labelIcon={Label}
                                            labelInfo={p.times}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    ) : ""}
                                </StyledTreeItem>
                                <StyledTreeItem nodeId="4" labelText="Chapter" labelIcon={FeaturedPlayListIcon}>
                                    {data ? data.chapter.map((p, i) =>
                                        <StyledTreeItem
                                            key={i}
                                            nodeId={`chapter${i}`}
                                            labelText={p.chapter}
                                            labelIcon={Label}
                                            labelInfo={p.times}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    ) : ""}
                                </StyledTreeItem>

                            </TreeView> : ""}
                        </Grid>

                    </Grid>:<Typography>Select a teacher to get statistic data.</Typography>}

                </Grid>
            </Grid >
        </div >
    )
}
Statistic.prototypes = {
    stateTeacherList: PropTypes.array.isRequired,
}
const MapStateToProps = (state) => ({
    stateTeacherList: state.admin.teacherList,
})

export default connect(MapStateToProps)(Statistic)
