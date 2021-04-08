package com.dardan.rrafshi.appman.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.dardan.rrafshi.commons.exceptions.ApplicationRuntimeException;


public final class AppmanException
{
	private AppmanException() {}


	@ResponseStatus(code=HttpStatus.BAD_REQUEST)
	public static class BadRequest extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public BadRequest(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public BadRequest(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.UNAUTHORIZED)
	public static class Unauthorized extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public Unauthorized(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public Unauthorized(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.FORBIDDEN)
	public static class Forbidden extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public Forbidden(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public Forbidden(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.NOT_FOUND)
	public static class NotFound extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public NotFound(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public NotFound(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.LENGTH_REQUIRED)
	public static class LengthRequired extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public LengthRequired(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public LengthRequired(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	public static class UnsupportedMediaType extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public UnsupportedMediaType(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public UnsupportedMediaType(final String message)
		{
			super(message);
		}
	}

	@ResponseStatus(code=HttpStatus.INTERNAL_SERVER_ERROR)
	public static class InternalServerError extends ApplicationRuntimeException
	{
		private static final long serialVersionUID = 1L;


		public InternalServerError(final String message, final Throwable cause)
		{
			super(message, cause);
		}

		public InternalServerError(final String message)
		{
			super(message);
		}
	}
}
