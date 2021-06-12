import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ArchiveArrowDown from 'mdi-material-ui/ArchiveArrowDown'
import BriefcaseIcon from 'mdi-material-ui/Briefcase'
import DockerIcon from 'mdi-material-ui/Docker'
import HomeIcon from 'mdi-material-ui/Home'
import MapIcon from 'mdi-material-ui/Map'
import PowerPlugIcon from 'mdi-material-ui/PowerPlug'
import RaspberryPI from 'mdi-material-ui/RaspberryPi'
import Link, { LinkProps } from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({ toolbar: theme.mixins.toolbar })
)

const publicItemList = (router: NextRouter): ItemListProp[] => [
    {
        href: '/',
        text: 'home',
        itemIcon: <HomeIcon />,
        selected: router.pathname === '/',
    },
    {
        href: '/health-check',
        text: 'Health Check',
        itemIcon: <PowerPlugIcon />,
        selected: router.pathname === 'health-check',
    },
    {
        href: '/projects',
        text: 'Projects',
        itemIcon: <BriefcaseIcon />,
        selected: router.pathname.startsWith('/projects'),
    },
    {
        href: '/project-status',
        text: 'Project Status',
        itemIcon: <MapIcon />,
        selected: router.pathname.startsWith('/project-status'),
    },
]

const privateItemList = (router: NextRouter): ItemListProp[] => [
    {
        href: '/docker',
        text: 'Docker',
        itemIcon: <DockerIcon />,
        selected: router.pathname === '/docker',
    },
    {
        href: '/torrent',
        text: 'Torrent',
        itemIcon: <ArchiveArrowDown />,
        selected: router.pathname === '/torrent',
    },
    {
        href: '/pihole',
        text: 'PiHole',
        itemIcon: <RaspberryPI />,
        selected: router.pathname === '/pihole',
    },
]

const DrawerItems: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const publicItems = publicItemList(router)
    const privateItems = privateItemList(router)
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {publicItems.map((v) => (
                    <ItemList key={v.href.toString()} {...v} />
                ))}
            </List>
            <Divider />
            <List>
                {privateItems.map((v) => (
                    <ItemList key={v.href.toString()} {...v} />
                ))}
            </List>
        </div>
    )
}

interface ItemListProp extends ListItemProps, LinkProps {
    itemIcon: React.ReactElement
    text: string
}

function ItemList(props: ItemListProp) {
    return (
        <Link href={props.href} passHref>
            <ListItem button component="li" selected={props.selected}>
                <ListItemIcon>{props.itemIcon}</ListItemIcon>
                <ListItemText>{props.text}</ListItemText>
            </ListItem>
        </Link>
    )
}

export default DrawerItems
