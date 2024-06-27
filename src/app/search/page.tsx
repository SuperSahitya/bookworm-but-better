"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import Card from "~/components/Card";
import { Data } from "../page";

type DataFromSearch = {
  nameMatches: Data[];
  authorMatches: Data[];
};

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookName, setBookName] = useState<Data[]>([]);
  const [authorName, setAuthorName] = useState<Data[]>([]);
  const [query, setQuery] = useState("");
  const search = searchParams.get("query");
  async function getData(search: string) {
    try {
      console.log("called");
      const fetchedData = await fetch(`/api/search?query=${search}`, {
        credentials: "include",
      });
      if (!fetchedData.ok) {
        console.error("Error Occured while fetching data");
        return;
      }
      const res = (await fetchedData.json()) as DataFromSearch;
      const nameMatches = res.nameMatches;
      const authorMatches = res.authorMatches;
      setBookName(nameMatches);
      console.log(nameMatches);
      console.log(authorMatches);
      setAuthorName(authorMatches);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
    }
  }
  useEffect(() => {
    getData(search!).catch((e) => console.error(e));
    setLoading(false);
  }, [search]);

  useEffect(() => {
    setBookName([]);
    setAuthorName([]);
  }, [search]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setQuery("");
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.inputForm} onSubmit={(e) => handleSubmit(e)}>
          <input
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <IoMdSearch className={styles.icon} />
        </form>
        <div className={styles.searchHeading}>
          {`Search Results For : `}
          <em className={styles.searchTerm}>{`"${search}"`}</em>
        </div>
        {bookName.length > 0 ? <h3>Books</h3> : ""}
        <div className={styles.searchedList}>
          {!loading &&
            bookName.map((m, idx) => {
              return (
                <Link key={idx} href={`/${m.id}`}>
                  <Card
                    key={m.id}
                    bookId={m.id}
                    bookName={m.name}
                    author={m.author}
                    price={m.price}
                    imageUrl={m.imageUrl}
                    stock={m.stock}
                  ></Card>
                </Link>
              );
            })}
        </div>
        {authorName.length > 0 ? (
          <h3 className={styles.authorHeading}>Authors</h3>
        ) : (
          ""
        )}
        <div className={styles.searchedList}>
          {!loading &&
            authorName.map((m, idx) => {
              return (
                <Link key={idx} href={`/${m.id}`}>
                  <Card
                    key={m.id}
                    bookId={m.id}
                    bookName={m.name}
                    author={m.author}
                    price={m.price}
                    imageUrl={m.imageUrl}
                    stock={m.stock}
                  ></Card>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Search;
//add cms (add product functionality)
//system and admin and search filter email verification reset password and other stuff, checkout functionality
//rating system search recommendation product recommendation offers .
// profile button
