package ant.yum.exception;

public class RepositoryException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	public RepositoryException() {
		super("RepositoryException Occurs");
	}
	public RepositoryException(String message) {
		super(message);
	}
}
