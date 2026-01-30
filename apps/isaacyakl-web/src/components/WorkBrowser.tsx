"use client";

import WorkCard from "./WorkCard";
import React, { useState, useEffect, useRef } from "react";
import { isDesktop } from "react-device-detect";

export default function WorkBrowser({
    workMetadata = [],
    tagQuery = "",
    onQueryUpdate = undefined,
}: {
    workMetadata: Array<WorkFile>;
    tagQuery: string | undefined;
    onQueryUpdate?: (query: string) => void;
}) {
    const [searchQuery, setSearchQuery] = useState(tagQuery);
    const [filteredWorkComponents, setFilteredWorkComponents] =
        useState<React.ReactNode>([]);

    // Format a raw work data array into an WorkCard components array
    const formatWork = (e: Array<WorkFile>) => {
        return e.map((xp) => (
            <WorkCard
                id={xp.id}
                key={xp.id}
                image={xp.images[0]}
                title={xp.title}
                summary={xp.summary}
            />
        ));
    };

    // Filter the raw work data array based on the search query
    const filterWork = () => {
        return workMetadata.filter((xp) =>
            xp.tags.some((t) => {
                return (
                    t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    xp.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            })
        );
    };

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredWorkComponents(formatWork(workMetadata));
            return;
        } else if (filterWork().length === 0) {
            setFilteredWorkComponents([
                <p key="no-exp">No work found for that search term.</p>,
            ]);
            return;
        }
        setFilteredWorkComponents(formatWork(filterWork()));
    }, [searchQuery]);

    useEffect(() => {
        setSearchQuery(tagQuery);
    }, [tagQuery]);

    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isDesktop === true) searchInputRef?.current?.focus();
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder={`Search... (try "JavaScript")`}
                id="workSearch"
                className="rounded w-full bg-neutral-200 p-2 border-0 mb-2 placeholder:text-neutral-500"
                style={{ boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.1)" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (onQueryUpdate instanceof Function)
                        onQueryUpdate(e.target.value);
                    setSearchQuery(e.target.value);
                }}
                value={searchQuery}
                autoComplete="off"
                ref={searchInputRef}
            />
            {searchQuery !== "" && filterWork().length !== 0 ? (
                <p>Work found under &ldquo;{searchQuery}&rdquo;:</p>
            ) : (
                ""
            )}
            <div className="grid grid-cols-2 gap-2 overflow-hidden">
                {filteredWorkComponents}
            </div>
        </div>
    );
}
