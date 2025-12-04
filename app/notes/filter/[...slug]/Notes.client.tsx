"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useParams } from "next/navigation";

function App() {
  const params = useParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, params.slug],
    queryFn: () => fetchNotes(currentPage, searchQuery, params.slug?.[0]),
    placeholderData: keepPreviousData,
  });

  const notes = (data?.notes as Note[]) || [];
  const totalPages = data?.totalPages || 0;

  const setPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setSearchQuery(event.target.value);
    },
    300
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onChange={handleSearchChange} />}
        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
