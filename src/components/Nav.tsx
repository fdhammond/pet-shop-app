import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
    <div>
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-semibold">
            <Link to="/">GC Shop 🐈 - 🐕</Link>
            </div>
            <ul className="flex space-x-4">
            <li>
                <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                Home
                </Link>
            </li>
            <li>
                <Link
                to="/prices-with-differences-one-week"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                Prices With Differences One Week
                </Link>
            </li>
            </ul>
        </div>
        </nav>
    </div>
  );
}
