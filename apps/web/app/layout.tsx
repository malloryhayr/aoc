import { ImportantLink, NavLink } from 'ui';

import './global.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<header>
					<div style={{ display: 'flex' }}>
						<ImportantLink href="/">aoc.igalaxy.dev</ImportantLink>
						<div style={{ marginLeft: '1em' }}>
							<NavLink href="/about">[About]</NavLink>
							<NavLink href="/events">[Events]</NavLink>
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<ImportantLink href="/">2022</ImportantLink>
						<div style={{ marginLeft: '1em' }}>
							<NavLink href="/calendar">[Calendar]</NavLink>
							<NavLink href="/leaderboard">[Leaderboard]</NavLink>
						</div>
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}
