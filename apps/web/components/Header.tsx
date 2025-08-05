'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon, Bell, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title = "Dashboard" }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-6">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-muted-foreground lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-6 self-stretch">
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-foreground">
            {title}
          </h1>
        </div>
        
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-input/50 rounded-lg leading-5 bg-card/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm transition-all duration-200"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-muted ring-2 ring-border/50"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=84cc16&color=000`}
                alt=""
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-lg bg-card/95 backdrop-blur-md py-2 shadow-xl ring-1 ring-border/50 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={cn(
                        active ? 'bg-muted/50' : '',
                        'block px-3 py-2 text-sm leading-6 text-foreground transition-colors duration-200'
                      )}
                    >
                      {user?.name}
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={cn(
                        active ? 'bg-muted/50' : '',
                        'block w-full text-left px-3 py-2 text-sm leading-6 text-foreground transition-colors duration-200'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}