import { Link } from "@tanstack/solid-router";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  Layers,
  Menu,
  X,
} from "lucide-solid";

import { createSignal } from "solid-js";
import TanStackQueryHeaderUser from "../integrations/tanstack-query/header-user.tsx";

export default function Header() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <header class="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          class="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 class="ml-4 text-xl font-semibold">
          <Link to="/">
            <img
              src="/tanstack-word-logo-white.svg"
              alt="TanStack Logo"
              class="h-10"
            />
          </Link>
        </h1>
      </header>

      <aside
        class={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen() ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 class="text-xl font-bold">Navigation</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav class="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              class:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <Home size={20} />
            <span class="font-medium">Home</span>
          </Link>

          {/* Demo Links Start */}

          <Link
            to="/demo/start/server-funcs"
            onClick={() => setIsOpen(false)}
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              class:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <Globe size={20} />
            <span class="font-medium">Start - Server Functions</span>
          </Link>

          <Link
            to="/demo/tanstack-query"
            onClick={() => setIsOpen(false)}
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              class:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <Globe size={20} />
            <span class="font-medium">TanStack Query</span>
          </Link>

          {/* Demo Links End */}
        </nav>

        <div class="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2">
          <TanStackQueryHeaderUser />
        </div>
      </aside>
    </>
  );
}
