import { Home, Package, GitPullRequest, Users } from 'react-feather'

export const MENUITEMS = [
    {
        menutitle: "General",
        menucontent: "Main menu",
        Items: [
            { path: `/dashboard/home`, icon: Home, title: 'Dashboard', type: 'link' },
            { path: `/dashboard/transaction`, icon: GitPullRequest, title: 'Transaction', type: 'link' },
        ]
    },
]