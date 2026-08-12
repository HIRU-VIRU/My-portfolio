# SGBC Internship Documentation

## Intern

Name: Hiruthik Sudhakar

Role:
LLM Intern

Organization:
Sudha Gopalakrishnan Brain Centre (SGBC)
IIT Madras

Duration:
Day 1 → Present

---

# Internship Overview

During my internship I worked on three independent projects.

These projects are completely different from one another and should be treated independently.

Project 1
Discovery Backend Service

Project 2
3D Discovery

Project 3
Plugin Research

Although all projects belong to SGBC, they solve different problems and have different objectives.

---

# Project 1

Discovery Backend Service

## Objective

The Discovery Backend Service is the production backend responsible for powering internal discovery tools.

The objective of my work was to convert research code into production-ready APIs while improving scalability, responsiveness and maintainability of the backend.

---

## Initial Familiarization

During the first week I spent time understanding the existing system.

Areas explored included

• FastAPI backend architecture

• Service organization

• Milvus vector database

• MLflow integration

• MongoDB usage

• Docker deployment

• Existing REST APIs

• Internal request flow

This phase helped me understand how the production system was organized before implementing new features.

---

## Similarity Heatmap API

### Problem

Researchers had a notebook capable of generating similarity heatmaps.

However, this functionality was not available through the backend.

---

### Task

Convert the notebook into a production API.

---

### Work Completed

Designed a FastAPI endpoint

Created request models

Separated notebook logic into reusable services

Integrated Milvus vector retrieval

Generated similarity heatmaps

Returned rendered heatmap images through API

Added validation

Improved logging

---

### Optimizations

Background loading

Memory caching

Reduced repeated database access

Improved response time

Configurable grid specifications

---

## MLflow Integration

Implemented APIs for

Training

Inference

Status tracking

Result retrieval

Integrated these APIs with the existing backend architecture.

---

## Asynchronous Job Processing

### Problem

WSI inference required a long time.

Since inference was synchronous, one request blocked every other API request.

---

### Solution

Implemented asynchronous execution using

Celery

Redis

Background workers

---

### Features

Job submission endpoint

Job queue

Status endpoint

Result endpoint

Persistent job tracking

Background execution

---

### Impact

Large inference jobs no longer blocked the backend.

Other APIs remained responsive.

---

## Backend Improvements

Worked on

Docker configuration

Worker management

API organization

Logging

Code modularization

Performance improvements

---

## HTTP QUERY Benchmark

Studied support for the RFC QUERY HTTP method.

Compared

httptools

vs

h11

Benchmarked

Latency

Compatibility

Performance

Documented results and verified that h11 supports QUERY without meaningful performance degradation.

---

# Project 2

3D Discovery

## Objective

The purpose of this project is to generate volumetric similarity maps across entire Whole Slide Image datasets.

The project converts similarity between embeddings into a navigable 3D representation.

---

## Notebook Conversion

Initially the implementation existed as a research notebook.

My task was to convert it into a reusable backend service.

---

## Volume Generation API

Implemented an API capable of

Loading embeddings

Selecting query tiles

Computing similarity

Generating volumetric outputs

Streaming generated volumes

---

## Embedding Cache

Embedding files are extremely large.

Loading them repeatedly is expensive.

Implemented

Lazy loading

Thread-safe cache

24-hour TTL

Memory reuse

Reduced disk access

---

## Similarity Optimization

Optimized similarity search.

Previous implementation repeatedly computed cosine similarity.

New implementation

Normalized embeddings

Used matrix multiplication

Reduced conversions

Reduced runtime

Improved throughput

---

## Multi-query Research

Explored methods for searching using multiple query embeddings simultaneously.

Compared

Maximum aggregation

Mean aggregation

Performance tradeoffs

Memory requirements

Although not finalized, this research produced valuable design insights.

---

## PCA Research

Objective

Reduce 1536-dimensional embeddings.

Conducted experiments using PCA.

Generated reduced-dimensional embeddings.

Saved reduced embedding files.

Evaluated visualization possibilities.

---

## Signature-Based Tile Matching

Current research task.

Goal

Treat highest zoom-level tiles as signatures.

Search for these signatures across lower zoom levels.

Compute

Matched tiles

Unmatched tiles

Matching statistics

Evaluate retrieval quality.

---

# Project 3

Plugin Research

## Objective

The objective is to reduce inference cost.

Instead of processing entire Whole Slide Images, investigate whether thumbnails can contain sufficient contextual information.

---

## Research Question

Can thumbnail embeddings learn enough information to approximate WSI embeddings?

---

## Work Completed

Studied existing literature

Explored representation learning

Designed possible architectures

Researched context transfer

Investigated thumbnail-to-WSI embedding relationships

Designed possible inference pipelines

---

## Current Direction

Train models using

Thumbnail embeddings

WSI embeddings

During inference

Use only thumbnails

Reduce computational cost

Maintain retrieval quality.

---

# Skills Developed

Backend

FastAPI

Redis

Celery

Docker

MongoDB

MLflow

---

AI

Vector databases

Milvus

Similarity Search

Embedding systems

Representation Learning

PCA

---

Software Engineering

Backend architecture

Production APIs

Performance optimization

Caching

Research-to-production conversion

Benchmarking

System design

---

# Overall Impact

Throughout the internship I worked on converting research prototypes into production-ready engineering solutions.

The work spans backend engineering, AI infrastructure, scalable APIs, embedding optimization, research experimentation and system design.

The projects collectively improved the backend infrastructure while also contributing toward future research directions involving efficient embedding representations and low-cost inference pipelines.
