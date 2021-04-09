package com.dardan.rrafshi.appman.api.endpoint.parameter;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.dardan.rrafshi.commons.Strings;


public final class Paging
{
	private static final String DEFAULT_SORT_ORDER = "asc";
	private static final int MIN_PAGE_NUMBER = 1;
	private static final int MIN_PAGE_SIZE = 12;
	private static final int MAX_PAGE_SIZE = 60;

	private int page = MIN_PAGE_NUMBER;
	private int pageSize = MIN_PAGE_SIZE;
	private String sortOrder = DEFAULT_SORT_ORDER;
	private String sortBy;


	public Pageable toPageRequest()
	{
		final var page = this.page < MIN_PAGE_NUMBER ? MIN_PAGE_NUMBER - 1 : this.page - 1;

		final var size = this.pageSize < MIN_PAGE_SIZE ? MIN_PAGE_SIZE
				: this.pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : this.pageSize;

		if (Strings.isNotEmpty(this.sortBy)) {
			final var direction = Direction.fromString(this.sortOrder);
			final var sort = Sort.by(direction, this.sortBy);
			return PageRequest.of(page, size, sort);
		}

		return PageRequest.of(page, size);
	}

	@Override
	public String toString()
	{
		return "Paging [page=" + this.page + ", pageSize=" + this.pageSize + ", sortOrder=" + this.sortOrder
				+ ", sortBy=" + this.sortBy + "]";
	}


	public int getPage()
	{
		return this.page;
	}

	public void setPage(final int page)
	{
		this.page = page;
	}

	public int getPageSize()
	{
		return this.pageSize;
	}

	public void setPageSize(final int pageSize)
	{
		this.pageSize = pageSize;
	}

	public String getSortOrder()
	{
		return this.sortOrder;
	}

	public void setSortOrder(final String sortOrder)
	{
		this.sortOrder = sortOrder;
	}

	public String getSortBy()
	{
		return this.sortBy;
	}

	public void setSortBy(final String sortBy)
	{
		this.sortBy = sortBy;
	}
}
