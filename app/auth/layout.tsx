import {
  CalendarDaysIcon,
  LibraryBigIcon,
  MapIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid container h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-8 text-white dark:text-black lg:flex">
        <div className="absolute inset-0 bg-zinc-900 dark:bg-primary" />
        <div className="relative flex items-center text-lg font-medium tracking-tight">
          <ZapIcon className="mr-2 h-5 w-5" />
          xccelerate | recall app
        </div>
        <div className="relative mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl font-light">Start remembering.</p>
            <footer className="text-md font-extralight">
              You can use the Recall app for anything you want to remember. Here
              are a couple ideas of where to start:
              <ul className="p-2">
                <li className="flex items-center">
                  <VideoIcon className="mr-2 h-5 w-5" /> Movies or shows you
                  want to watch or have enjoyed.
                </li>
                <li className="flex items-center">
                  <LibraryBigIcon className="mr-2 h-5 w-5" /> Books you have
                  learnt from and want to remember.
                </li>
                <li className="flex items-center">
                  <MapIcon className="mr-2 h-5 w-5" /> Places you want to go.
                </li>
                <li className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-5 w-5" /> Events and
                  history you are interested in.
                </li>
                <li className="flex items-center">
                  <UsersIcon className="mr-2 h-5 w-5" /> People who inspire you.
                </li>
              </ul>
            </footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}
