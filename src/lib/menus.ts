import { TreeNodeType } from '@/components/ui/treeview'

export const DashboardMenu: TreeNodeType = {
    id: '0',
    name: 'Dashboard',
    url: '/',
}
export const TimeMenu: TreeNodeType = {
    id: '1',
    name: 'Time',
    url: '/time',
}
export const EthicsMenu: TreeNodeType = {
    id: '2',
    name: 'Ethics & Code of Conduct',
    url: '',
    children:[
        {
            id: '21',
            name: 'Workplace Professionalism',
            url: '/encc/workplace-professionalism',
        },
        {
            id: '22',
            name: 'Daily Activities',
            url: '/encc/daily-activities',
        },
        {
            id: '23',
            name: 'Use of Company Property',
            url: '/encc/use-of-company-property',
        },
    ]
}
export const AboutMenu: TreeNodeType =  {

    id: '3',
    name: 'About',
    url: '',
    children:[
        {
            id: '31',
            name: 'Company',
            url: '/about/company',
        },
        {
            id: '32',
            name: 'Mission',
            url: '/about/mission',
        },
        {
            id: '33',
            name: 'Vision',
            url: '/about/vision',
        },
    ]
}
export const ContactMenu: TreeNodeType = {
    id: '4',
    name: 'Contact',
    url: '/contact',
}
export const AdminMenu: TreeNodeType =  {

    id: '5',
    name: 'Admin',
    url: '',
    children:[        
        {
            id: '51',
            name: 'Approve Time',
            url: '/admin/approve-time',
        },
        {
            id: '52',
            name: 'Approve Leave',
            url: '/admin/approve-leave',
        },
        {
            id: '53',
            name: 'Time Reports',
            url: '/admin/time-report',
        },
        {
            id: '54',
            name: 'Leave Reports',
            url: '/admin/leave-report',
        },
    ]
}