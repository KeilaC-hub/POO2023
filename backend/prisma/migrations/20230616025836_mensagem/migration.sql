-- CreateTable
CREATE TABLE "mensagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL,
    "qtdeLikes" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL
);
